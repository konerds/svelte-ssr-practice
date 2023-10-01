<script>
    import Button from '../../lib/components/shared/Button.svelte';

    export let data;
    let meetupMatched = data.meetupMatched;
</script>

<section>
    <div class="image">
        <img src={meetupMatched.urlImage} alt={meetupMatched.title} />
    </div>
    <div class="content">
        <h1>{meetupMatched.title}</h1>
        <h2>{meetupMatched.subtitle} - {meetupMatched.address}</h2>
        <p>{meetupMatched.description}</p>
        <Button type="link" href="mailto:{meetupMatched.emailContact}">Contact</Button>
        <Button classShape="outline" type="link" href="/">Close</Button>
    </div>
</section>

<style>
    .image {
        width: 100%;
        height: 25rem;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .image {
        background: #e7e7e7;
    }

    .content {
        text-align: center;
        width: 80%;
        margin: auto;
    }

    h1 {
        font-size: 2rem;
        font-family: 'Roboto Slab', sans-serif;
        margin: 0.5rem 0;
    }

    h2 {
        font-size: 1.25rem;
        color: #6b6b6b;
    }

    p {
        font-size: 1.5rem;
    }
</style>
