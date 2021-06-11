<script>
    import loginUser from '../strapi/loginUser';
    import registerUser from '../strapi/registerUser';
    import {navigate} from 'svelte-routing';
    import globalStore from "../stores/globalStore";

    let email = '';
    let password = '';
    let username = 'default username';
    let isMember = true;
    // add alert
    $: isEmpty = !email || !email || !username || $globalStore.alert;
    
    // toggle member
    function toggleMember() {
        isMember = !isMember;
        if(!isMember){
            username = "";
        } else {
            username = "default username";
        }
    }
    // handle submit
    async function handleSubmit() {
        // add alert
        globalStore.toggleItem("alert", true, "loading data...please wait!");
        let user;
        if(isMember){
            user = await loginUser({email, password});
        } else {
            user = await registerUser({email, password, username});
        }
        if(user){
            navigate("/products");
            // add alert
            globalStore.toggleItem("alert", true, "welcome to shopping madeness my friend!");
            return
        } 
        // add alert
        globalStore.toggleItem("alert", true, "there was an error! please try again", true);
    }
</script>

<section class="form">
    <h2 class="section-title">
        {#if isMember}
            sign in
        {:else}
            register
        {/if}
    </h2>
    <form action="login-form" on:submit|preventDefault={handleSubmit}>
        <!-- signle input -->
        <div class="form-control">
            <label for="email">email</label>
            <input type="email" id="email" bind:value={email}>
        </div>
        <!-- end of signle input -->
        <!-- signle input -->
        <div class="form-control">
            <label for="password">password</label>
            <input type="password" id="password" bind:value={password}>
        </div>
        <!-- end of signle input -->
        {#if !isMember}
            <!-- signle input -->
        <div class="form-control">
            <label for="username">username</label>
            <input type="text" id="password" bind:value={username}>
        </div>
        <!-- end of signle input -->
        {/if}
        {#if isEmpty}
            <p class="form-empty">please fill out all form fields</p>
        {/if}
        <button type="submit" class="btn btn-block btn-primary" disabled={isEmpty} class:disabled={isEmpty}>submit</button>
        {#if isMember}
            <p class="register-link">need to register?
                <button type="button" on:click={toggleMember}>click here</button>
            </p>
        {:else}
            <p class="register-link">already a member?
                <button type="button" on:click={toggleMember}>click here</button>
            </p>
        {/if}
    </form>
</section>

