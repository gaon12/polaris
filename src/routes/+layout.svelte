<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	const titles: Record<string, string> = {
		'/': 'Polaris - 온라인 주보 시스템',
		'/login': '로그인 - Polaris',
		'/signup': '회원가입 - Polaris'
	};

	const pageTitle = $derived(titles[page.url.pathname] ?? 'Polaris');
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<link rel="icon" href={favicon} />
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-gov-dynamic-subset.min.css"
	/>
</svelte:head>
{@render children()}

<div style="display:none">
	{#each locales as locale (locale)}
		<a href={resolve(localizeHref(page.url.pathname, { locale }) as Pathname)}>{locale}</a>
	{/each}
</div>

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(html) {
		scroll-behavior: smooth;
	}

	:global(body) {
		margin: 0;
		background: #ffffff;
		color: #1e2124;
		font-family:
			'Pretendard GOV',
			'Pretendard',
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			sans-serif;
		line-height: 1.5;
	}

	:global(a) {
		color: inherit;
		text-decoration: none;
	}

	:global(button),
	:global(input),
	:global(select) {
		font: inherit;
	}

	:global(:focus-visible) {
		outline: 4px solid #86aff9;
		outline-offset: 3px;
	}
</style>
