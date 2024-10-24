<script>
    import { browser } from '$app/environment';
    import { persist, createLocalStorage } from "@macfja/svelte-persistent-store"
    import { writable } from 'svelte/store';
    import { onMount } from 'svelte';
    const user = browser ? persist(writable({}), createLocalStorage(), "user") : null
    var users=[]
    var usermail = ''
    onMount(async() => {
        users = await 
            fetch('http://localhost:3000/user')
                .then(v => v.json())
        usermail = $user?.email
    })
</script>
{#if $user?.name}
<h1>{$user.name}</h1>
<input type="text" bind:value={usermail}>
<input type="button" value="Módosít" on:click={async () => {
    let answ = await fetch(`http://localhost:3000/user/${$user.id}`, {
        method: 'PATCH',
        body: JSON.stringify({id: $user.id, email: usermail}),
        headers: { 'Content-Type': 'application/json' }
    }).then(v => v.json())
}}>
<br>
<input type=button on:click={() => {
    user.set('')
    usermail = ''
}} value="Kijelentkezés" />
{:else}
<h1>Bejelentkezés</h1>
<hr>
<form>
    <label for="email">Email</label>
    <input type="email" name="email" id="email">
    <label for="pw">Jelszó</label>
    <input type="password" name="pw" id="pw">
    <input type=button on:click={() => {
        user.set(users.find(u => u.email === document.getElementById('email').value && u.pw === document.getElementById('pw').value))
        usermail = $user?.email
}} value="Bejelentkezés" />
</form>
{/if}
<style>
    :global(body) {
        text-align: center;
        font-family: sans-serif;
    }
    form {
        display: inline-flex;
        flex-direction: column;
        margin: auto;
        width: 300px;
    }
    input {
        margin-bottom: 10px;
    }
    input[type='button'] {
        margin-top: 10px;
    }
</style>