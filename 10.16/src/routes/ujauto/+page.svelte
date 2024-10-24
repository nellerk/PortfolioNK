<script>
    import { browser } from '$app/environment';
    import { persist, createLocalStorage } from "@macfja/svelte-persistent-store"
    import { writable } from 'svelte/store';
    var user = browser ? persist(writable({}), createLocalStorage(), "user") : null
    console.log($user);
    
    var urlap = {
        brand: '',
        type: '',
        year: '',
        price: '',
        stars: '',
        tulaj: $user.id
    }
</script>
<br><br>
{#if $user}
<form>
    <table>
        <tr>
            <th>Brand</th><td><input type="text" bind:value={urlap.brand}></td>
        </tr>
        <tr>    
            <th>Type</th><td><input type="text" bind:value={urlap.type}></td>
        </tr>
        <tr>
            <th>Year</th><td><input type="number" bind:value={urlap.year}></td>
        </tr>
        <tr>
            <th>Price</th><td><input type="number" bind:value={urlap.price}></td>    
        </tr>
        <tr>    
            <th>Stars</th><td><input type="number" bind:value={urlap.stars}></td>    
        </tr>
    </table>
    <input type=button on:click={async () => {
        var data = await fetch('http://localhost:3000/car',
         { method: 'POST', 
           body: JSON.stringify(urlap),
           headers: { 'Content-Type': 'application/json' }
         }).then(v => v.json())
    }}>
</form>
{:else}
<h1>Nincs bejelentkezve</h1>
<hr>
{/if}
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