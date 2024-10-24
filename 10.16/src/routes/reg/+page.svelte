<script>
    import { redirect } from '@sveltejs/kit';
    import { browser } from '$app/environment';
    import { persist, createLocalStorage } from "@macfja/svelte-persistent-store"
    import { writable } from 'svelte/store';
    const user = browser ? persist(writable({}), createLocalStorage(), "user") : null
    var urlap = {
        name: '',
        email: '',
        pw: ''}
</script>
<br><br><br>
<form>
    <table>
        <tr>
            <th>Name</th><td><input type="text" bind:value={urlap.name}></td>
        </tr>
        <tr>
            <th>Email</th><td><input type="email" bind:value={urlap.email}></td>
        </tr>    
        <tr>
            <th>Jelszó</th><td><input type="password" bind:value={urlap.pw}></td>
        </tr>
    </table>
    <input type=button on:click={async () => {
        var data = await fetch('http://localhost:3000/user',
         { method: 'POST', 
           body: JSON.stringify(urlap),
           headers: { 'Content-Type': 'application/json' }
         }).then(v => v.json())
        user.set(data)
        redirect(302, '/autok_list')
    }} value="Regisztráció" />
</form>
<style>
    form {
        margin: auto;
        text-align: center;
        display: block;
        width: 300px;
        background-color: bisque;
        padding:20px;
        border: 1px solid black;
    }
    td {
        width: 400px;
    }
</style>