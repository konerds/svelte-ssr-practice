<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let modeFilter = 0;
</script>

<div>
    <button
        type="button"
        class:active={modeFilter === 0}
        on:click={() => {
            modeFilter = 0;
            dispatch('select', modeFilter);
        }}>All</button
    >
    <button
        type="button"
        class:active={modeFilter === 1}
        on:click={() => {
            modeFilter = 1;
            dispatch('select', modeFilter);
        }}>Favorite</button
    >
</div>

<style>
    div {
        font-size: 0px;
    }

    button {
        background: #aaaaaa;
        font: inherit;
        font-size: 1rem;
        cursor: pointer;
        border: 1px solid #aaaaaa;
        padding: 0.5rem 1rem;
    }

    button:focus {
        outline: none;
    }

    button:first-of-type {
        border-radius: 5px 0 0 5px;
    }

    button:last-of-type {
        border-radius: 0 5px 5px 0;
    }

    button:hover,
    button:active,
    .active {
        background: #cf0056;
        border-color: #cf0056;
        color: white;
    }
</style>
