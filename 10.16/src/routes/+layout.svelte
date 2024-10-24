<script>
    import { browser } from '$app/environment';
    import { persist, createLocalStorage } from "@macfja/svelte-persistent-store"
    import { writable } from 'svelte/store';
    var user = browser ? persist(writable({}), createLocalStorage(), "user") : null
    setInterval(() => {
        user = browser ? persist(writable({}), createLocalStorage(), "user") : null
    }, 300)
</script>
{#if $user}
<a href="/">Kezdőlap</a>
<a href="/autok_list">Autók</a>
<a href="/ujauto">Uj autó felvétele</a>
{:else}
<a href="/">Login</a>
<a href="/reg">Regisztráció</a>
{/if}
<slot />
<style>
    a {
        all: unset;
        margin: 5px;
        padding:5px;
        border: 1px solid black;    
        cursor: pointer;
    }
    a:hover {
        background-color: aquamarine;
    }
    :global(body) {
        text-align: center;
    }
</style>