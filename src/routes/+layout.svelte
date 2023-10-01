<script>
    import './styles.css';
    import Header from '../lib/components/shared/Header.svelte';
</script>

<div class="app">
    <Header />
    <main>
        <slot />
    </main>
</div>

<style>
    main {
        padding-top: 4rem;
    }
</style>
