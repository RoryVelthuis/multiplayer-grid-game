<script>
    import { onMount } from 'svelte';

    import AnimationCanvas from '../components/AnimationCanvas.svelte';
</script>

<div class="page">
    <AnimationCanvas />
</div>

<style>
    .page {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f0f0f0;
    }
</style>