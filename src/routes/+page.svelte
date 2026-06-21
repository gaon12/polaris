<script lang="ts">
	import HeroSection from '$lib/components/polaris/HeroSection.svelte';
	import HomeContent from '$lib/components/polaris/HomeContent.svelte';
	import SiteFooter from '$lib/components/polaris/SiteFooter.svelte';
	import SiteHeader from '$lib/components/polaris/SiteHeader.svelte';
	import { menuItems } from '$lib/polaris/home';
</script>

<svelte:head>
	<meta
		name="description"
		content="Polaris는 교회 주보를 모바일 친화적인 구조화 콘텐츠로 만들고 공유하는 온라인 주보 시스템입니다."
	/>
</svelte:head>

<SiteHeader {menuItems} />

<main id="main">
	<HeroSection />
	<HomeContent />
</main>

<SiteFooter />
