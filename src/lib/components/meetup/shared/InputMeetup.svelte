<script>
    export let typeControl = 'inputText';
    export let id;
    export let label;
    export let rows = null;
    export let value;
    export let isValid = true;
    export let msgValidity = '';

    let isEntered = false;
</script>

{#if ['textarea', 'inputText', 'inputEmail'].includes(typeControl)}
    <div class="form-control">
        <label for={id}>{label}</label>
        {#if typeControl === 'textarea'}
            <!-- <textarea
                class:invalid={isEntered && !isValid}
                {rows}
                {id}
                {value}
                on:input
                on:blur={() => {
                    isEntered = true;
                }}
            /> -->
            <textarea
                class:invalid={isEntered && !isValid}
                {rows}
                {id}
                bind:value
                on:blur={() => {
                    isEntered = true;
                }}
            />
        {:else if typeControl === 'inputText'}
            <!-- <input
                class:invalid={isEntered && !isValid}
                type="text"
                {id}
                {value}
                on:input
                on:blur={() => {
                    isEntered = true;
                }}
            /> -->
            <input
                class:invalid={isEntered && !isValid}
                type="text"
                {id}
                bind:value
                on:blur={() => {
                    isEntered = true;
                }}
            />
        {:else if typeControl === 'inputEmail'}
            <!-- <input
                class:invalid={isEntered && !isValid}
                type="email"
                {id}
                {value}
                on:input
                on:blur={() => {
                    isEntered = true;
                }}
            /> -->
            <input
                class:invalid={isEntered && !isValid}
                type="email"
                {id}
                bind:value
                on:blur={() => {
                    isEntered = true;
                }}
            />
        {/if}
        {#if isEntered && !isValid && !!msgValidity}
            <p class="message-error">{msgValidity}</p>
        {/if}
    </div>
{/if}

<style>
    input,
    textarea {
        display: block;
        width: 100%;
        font: inherit;
        border: none;
        border-bottom: 2px solid #ccc;
        border-radius: 3px 3px 0 0;
        background: white;
        padding: 0.15rem 0.25rem;
        transition: border-color 0.1s ease-out;
    }

    input:focus,
    textarea:focus {
        border-color: #e40763;
        outline: none;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        width: 100%;
    }

    .form-control {
        padding: 0.5rem 0;
        width: 100%;
        margin: 0.25rem 0;
    }

    .invalid {
        border-color: red;
        background-color: #fde3e3;
    }

    .message-error {
        color: red;
        margin: 0.25rem 0;
    }
</style>
