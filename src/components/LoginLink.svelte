<script>
    import user from '../stores/user';
    import {link} from 'svelte-routing';
    import {logoutUser} from '../stores/user';
    import globalStore from '../stores/globalStore';
</script>

<!-- added the use:link property to navigate to either the login or the home pages -->
{#if $user.jwt}
    <a href="/" class="logout-btn" on:click="{() => {
        logoutUser();
        globalStore.toggleItem('sidebar', false);
    }}" use:link>logout</a>
{:else}
<a href="/login" on:click="{() => {
    globalStore.toggleItem('sidebar', false);
}}" use:link>login</a>
{/if}