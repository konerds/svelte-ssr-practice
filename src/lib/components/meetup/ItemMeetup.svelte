<script>
    import { createEventDispatcher } from 'svelte';

    import storeMeetup from '../../store/store-meetup.js';

    import Button from '../shared/Button.svelte';
    import Badge from '../shared/Badge.svelte';
    import SpinnerLoading from '../shared/SpinnerLoading.svelte';
    import { patchIsFavoriteMeetup } from '../../utils/api.js';

    const dispatch = createEventDispatcher();

    let isProcessing = false;

    export let id;
    export let title;
    export let subtitle;
    export let urlImage;
    export let description;
    export let address;
    export let emailContact;
    export let isFavorite;

    function handlerToggleFavorite() {
        isProcessing = true;
        patchIsFavoriteMeetup(id, isFavorite)
            .then(() => {
                storeMeetup.toggleFavorite(id);
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                isProcessing = false;
            });
    }
</script>

<article>
    <header>
        <h1>
            {title}
            {#if isFavorite}
                <Badge>FAVORITE</Badge>
            {/if}
        </h1>
        <h2>{subtitle}</h2>
        <p>{address}</p>
    </header>
    <div class="image">
        <img src={urlImage} alt={title} />
    </div>
    <div class="content">
        <p>{description}</p>
    </div>
    <footer>
        <Button
            classShape="outline"
            on:click={() => {
                dispatch('edit', id);
            }}>Edit</Button
        >
        {#if isProcessing}
            <SpinnerLoading />
        {:else}
            <Button classShape="outline {isFavorite ? 'success' : ''}" on:click={handlerToggleFavorite}>
                {isFavorite ? 'Unfavorite' : 'Favorite'}</Button
            >
        {/if}
        <Button type="link" href="/{id}">Show Details</Button>
    </footer>
</article>

<style>
    article {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        border-radius: 5px;
        background: white;
        margin: 1rem;
    }

    header,
    .content,
    footer {
        padding: 1rem;
    }

    .image {
        width: 100%;
        height: 14rem;
    }

    .image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    h1 {
        font-size: 1.25rem;
        margin: 0.5rem 0;
        font-family: 'Roboto Slab', sans-serif;
    }

    h1.is-favorite {
        background: #01a129;
        color: white;
        padding: 0 0.5rem;
        border-radius: 5px;
    }

    h2 {
        font-size: 1rem;
        color: #808080;
        margin: 0.5rem 0;
    }

    p {
        font-size: 1.25rem;
        margin: 0;
    }

    div {
        text-align: right;
    }
</style>
