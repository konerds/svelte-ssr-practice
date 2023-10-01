<script>
    import { onMount, onDestroy } from 'svelte';

    import { scale } from 'svelte/transition';
    import { flip } from 'svelte/animate';

    import storeMeetup from '../lib/store/store-meetup';

    import EditMeetup from '../lib/components/meetup/EditMeetup.svelte';
    // import SpinnerLoading from '../lib/components/shared/SpinnerLoading.svelte';
    import FilterMeetup from '../lib/components/meetup/FilterMeetup.svelte';
    import Button from '../lib/components/shared/Button.svelte';
    import ItemMeetup from '../lib/components/meetup/ItemMeetup.svelte';
    // import { getListMeetup } from '../lib/utils/api';

    /**
     * SSR Fetching
     */
    export let data;

    let arrMeetup = data.arrMeetup;

    let unsubscribeListMeetup;

    let isVisibleEdit = false;
    let idEdit = null;

    // let isFetching;

    let modeFilter = 0;

    $: arrMeetupFiltered = modeFilter === 0 ? arrMeetup : arrMeetup.filter((m) => m.isFavorite);

    onMount(() => {
        /**
         * For synchronizing between SSR Fetching and Store
         */
        storeMeetup.setListMeetup(data.arrMeetup);
        unsubscribeListMeetup = storeMeetup.subscribe((items) => {
            arrMeetup = items;
        });

        /**
         * For CSR Fetching
         */
        // isFetching = true;
        // getListMeetup()
        //     .then((d) => {
        //         const arrMeetupLoaded = [];
        //         for (const k in d) {
        //             arrMeetupLoaded.push({
        //                 ...d[k],
        //                 id: k,
        //             });
        //         }
        //         storeMeetup.setListMeetup(arrMeetupLoaded.reverse());
        //         isFetching = false;
        //     })
        //     .catch((e) => {
        //         console.log(e);
        //         isFetching = false;
        //     });
    });

    onDestroy(() => {
        if (!!unsubscribeListMeetup) {
            unsubscribeListMeetup();
        }
    });

    function handlerStartEditAdd() {
        idEdit = null;
        isVisibleEdit = true;
    }

    function handlerStartEdit(event) {
        idEdit = event.detail;
        isVisibleEdit = true;
    }

    function handlerSaveEdit() {
        isVisibleEdit = false;
        idEdit = null;
    }

    function handlerCancelEdit() {
        isVisibleEdit = false;
        idEdit = null;
    }

    function handlerSelectFilter(event) {
        modeFilter = event.detail;
    }
</script>

<svelte:head>
    <title>All Meetups</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

{#if isVisibleEdit}
    <EditMeetup id={idEdit} on:save={handlerSaveEdit} on:cancel={handlerCancelEdit} />
{/if}

<!-- {#if isFetching !== false}
    <SpinnerLoading />
{:else} -->
<section id="controls-meetup">
    <FilterMeetup on:select={handlerSelectFilter} />
    <Button on:click={handlerStartEditAdd}>New Meetup</Button>
</section>
{#if !!arrMeetupFiltered}
    {#if arrMeetupFiltered.length <= 0}
        <p id="empty-meetups">No meetups found, you can start adding some.</p>
    {/if}
    <section id="list-meetup">
        {#each arrMeetupFiltered as meetup (meetup.id)}
            <div transition:scale animate:flip={{ duration: 300 }}>
                <ItemMeetup
                    id={meetup.id}
                    title={meetup.title}
                    subtitle={meetup.subtitle}
                    urlImage={meetup.urlImage}
                    description={meetup.description}
                    address={meetup.address}
                    emailContact={meetup.emailContact}
                    isFavorite={meetup.isFavorite}
                    on:edit={handlerStartEdit}
                />
            </div>
        {/each}
    </section>
{/if}

<!-- {/if} -->

<style>
    section#controls-meetup {
        margin: 1rem;
        display: flex;
        justify-content: space-between;
    }

    section#list-meetup {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1rem;
    }

    @media (min-width: 768px) {
        section#list-meetup {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    #empty-meetups {
        margin: 1rem;
    }
</style>
