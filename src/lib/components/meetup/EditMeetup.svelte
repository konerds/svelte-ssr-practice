<script>
    import storeMeetup from '../../store/store-meetup.js';
    import { deleteMeetup, patchMeetup, postMeetup } from '../../utils/api.js';
    import { createEventDispatcher } from 'svelte';
    import InputMeetup from './shared/InputMeetup.svelte';
    import Button from '../shared/Button.svelte';
    import Modal from '../shared/Modal.svelte';
    import { checkIsEmpty, checkIsValidEmail } from '../../utils/validation.js';

    const dispatch = createEventDispatcher();

    export let id = null;

    let titleEntered = '';
    let subtitleEntered = '';
    let descriptionEntered = '';
    let urlImageEntered = '';
    let addressEntered = '';
    let emailContactEntered = '';

    if (!!id) {
        const unsubscribe = storeMeetup.subscribe((items) => {
            const meetupMatched = items.find((m) => {
                return m.id === id;
            });
            titleEntered = meetupMatched.title;
            subtitleEntered = meetupMatched.subtitle;
            descriptionEntered = meetupMatched.description;
            urlImageEntered = meetupMatched.urlImage;
            addressEntered = meetupMatched.address;
            emailContactEntered = meetupMatched.emailContact;
        });
        unsubscribe();
    }

    $: isValidTitle = !checkIsEmpty(titleEntered);
    $: isValidSubtitle = !checkIsEmpty(subtitleEntered);
    $: isValidDescription = !checkIsEmpty(descriptionEntered);
    $: isValidUrlImage = !checkIsEmpty(urlImageEntered);
    $: isValidAddress = !checkIsEmpty(addressEntered);
    $: isValidEmailContact = checkIsValidEmail(emailContactEntered);

    $: isValidForm =
        isValidTitle &&
        isValidSubtitle &&
        isValidDescription &&
        isValidUrlImage &&
        isValidAddress &&
        isValidEmailContact;

    function handlerSubmitForm() {
        const dataMeetupNew = {
            title: titleEntered,
            subtitle: subtitleEntered,
            description: descriptionEntered,
            urlImage: urlImageEntered,
            address: addressEntered,
            emailContact: emailContactEntered,
        };
        if (!!id) {
            patchMeetup(id, dataMeetupNew)
                .then(() => {
                    storeMeetup.updateMeetup(id, dataMeetupNew);
                    dispatch('save');
                })
                .catch((e) => {
                    console.log(e);
                });
        } else {
            postMeetup(dataMeetupNew)
                .then((d) => {
                    storeMeetup.addMeetup({ ...dataMeetupNew, isFavorite: false, id: d.name });
                    dispatch('save');
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }

    function handlerDeleteMeetup() {
        deleteMeetup(id)
            .then(() => {
                storeMeetup.removeMeetup(id);
                dispatch('save');
            })
            .catch((e) => {
                console.log(e);
            });
    }

    function handlerCancel() {
        dispatch('cancel');
    }
</script>

<Modal title="{!!id ? 'Edit ' : 'Add '}Meetup Data" on:cancel>
    <form on:submit|preventDefault={handlerSubmitForm}>
        <InputMeetup
            id="title"
            label="Title"
            isValid={isValidTitle}
            msgValidity="Please enter a valid title."
            bind:value={titleEntered}
        />
        <InputMeetup
            id="subtitle"
            label="Subtitle"
            isValid={isValidSubtitle}
            msgValidity="Please enter a valid subtitle."
            bind:value={subtitleEntered}
        />
        <InputMeetup
            id="address"
            label="Address"
            isValid={isValidAddress}
            msgValidity="Please enter a valid address."
            bind:value={addressEntered}
        />
        <InputMeetup
            id="url-image"
            label="Image URL"
            isValid={isValidUrlImage}
            msgValidity="Please enter a valid image url."
            bind:value={urlImageEntered}
        />
        <InputMeetup
            typeControl="inputEmail"
            id="email-contact"
            label="E-Mail"
            isValid={isValidEmailContact}
            msgValidity="Please enter a valid email address."
            bind:value={emailContactEntered}
        />
        <InputMeetup
            typeControl="textarea"
            id="description"
            label="Description"
            rows={3}
            isValid={isValidDescription}
            msgValidity="Please enter a valid description."
            bind:value={descriptionEntered}
        />
    </form>
    <div slot="footer">
        <Button classShape="outline" on:click={handlerCancel}>Cancel</Button>
        <Button on:click={handlerSubmitForm} disabled={!isValidForm}>Save</Button>
        {#if !!id}
            <Button on:click={handlerDeleteMeetup}>Delete</Button>
        {/if}
    </div>
</Modal>

<style>
    form {
        width: 100%;
    }
</style>
