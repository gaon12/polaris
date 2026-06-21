<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import BrandMark from './BrandMark.svelte';
	import DisplaySettingsModal from './DisplaySettingsModal.svelte';

	let {
		menuItems
	}: {
		menuItems: Array<{ label: string; href: string }>;
	} = $props();

	type Locale = (typeof locales)[number];

	let settingsOpen = $state(false);
	let selectedLocale = $state<Locale>('ko');

	function changeLanguage(event: Event) {
		const target = event.currentTarget as HTMLSelectElement;
		selectedLocale = target.value as Locale;
		const href = resolve(localizeHref(page.url.pathname, { locale: selectedLocale }) as Pathname);
		window.location.href = href;
	}

	function scrollToTarget(target: string) {
		document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<a class="skip-link" href="#main">본문 바로가기</a>

<header class="site-header">
	<div class="utility-wrap">
		<div class="utility" aria-label="보조 메뉴">
			<label>
				<span>언어</span>
				<select
					aria-label="언어"
					bind:value={selectedLocale}
					class="language-select"
					onchange={changeLanguage}
				>
					{#each locales as locale (locale)}
						<option value={locale}>{locale === 'ko' ? '한국어' : locale.toUpperCase()}</option>
					{/each}
				</select>
			</label>
			<span class="divider" aria-hidden="true"></span>
			<button aria-controls="display-settings" type="button" onclick={() => (settingsOpen = true)}
				>글자·화면 설정</button
			>
		</div>
	</div>

	<div class="brand-wrap">
		<a class="brand" href={resolve('/')} aria-label="Polaris 홈">
			<BrandMark />
			<span>
				<strong>Polaris</strong>
				<small>Online Bulletin System</small>
			</span>
		</a>
		<button class="search-link" onclick={() => scrollToTarget('#search')} type="button">
			<span class="search-icon" aria-hidden="true"></span>
			<strong>통합검색</strong>
		</button>
	</div>

	<nav class="main-menu" aria-label="주 메뉴">
		{#each menuItems as item (item.label)}
			<button onclick={() => scrollToTarget(item.href)} type="button">
				{item.label}
				<span class="chevron" aria-hidden="true"></span>
			</button>
		{/each}
	</nav>
</header>

<DisplaySettingsModal open={settingsOpen} onClose={() => (settingsOpen = false)} />

<style>
	.skip-link {
		position: absolute;
		top: 12px;
		left: 24px;
		z-index: 10;
		padding: 10px 16px;
		background: #0b50d0;
		color: #ffffff;
		transform: translateY(-150%);
	}

	.skip-link:focus {
		transform: translateY(0);
	}

	.site-header {
		border-bottom: 1px solid #cdd1d5;
		background: #ffffff;
	}

	.utility-wrap,
	.brand-wrap,
	.main-menu {
		width: min(100% - 48px, 1200px);
		margin: 0 auto;
	}

	.utility-wrap {
		display: flex;
		justify-content: flex-end;
		padding: 18px 0 8px;
	}

	.utility {
		display: flex;
		align-items: center;
		gap: 14px;
		color: #33363d;
		font-size: 15px;
	}

	label {
		display: inline-flex;
		align-items: center;
		gap: 8px;
	}

	label span {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
	}

	select,
	.utility button {
		min-height: 36px;
		border: 1px solid transparent;
		border-radius: 6px;
		background: #ffffff;
		color: #1e2124;
		cursor: pointer;
		font-weight: 500;
	}

	select {
		padding: 0 32px 0 10px;
		border-color: #cdd1d5;
	}

	.utility button {
		padding: 0 4px;
	}

	.divider {
		width: 1px;
		height: 16px;
		background: #cdd1d5;
	}

	.brand-wrap {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 18px 0 20px;
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 12px;
	}

	.brand strong {
		display: block;
		font-size: 28px;
		line-height: 1;
	}

	.brand small {
		display: block;
		margin-top: 4px;
		color: #58616a;
		font-size: 11px;
	}

	.search-link {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		border: 0;
		background: transparent;
		color: #1e2124;
		cursor: pointer;
		font-size: 18px;
	}

	.search-icon {
		position: relative;
		width: 22px;
		height: 22px;
		border: 2px solid #1e2124;
		border-radius: 50%;
	}

	.search-icon::after {
		position: absolute;
		right: -6px;
		bottom: -5px;
		width: 8px;
		height: 2px;
		background: #1e2124;
		content: '';
		transform: rotate(45deg);
	}

	.main-menu {
		display: flex;
		align-items: center;
		gap: clamp(20px, 4vw, 64px);
		min-height: 56px;
		overflow: hidden;
		font-size: 19px;
		font-weight: 700;
		white-space: nowrap;
	}

	.main-menu button {
		display: inline-flex;
		border: 0;
		align-items: center;
		gap: 8px;
		min-height: 56px;
		background: transparent;
		cursor: pointer;
		font-weight: 700;
	}

	.chevron {
		width: 8px;
		height: 8px;
		border-right: 2px solid currentColor;
		border-bottom: 2px solid currentColor;
		transform: translateY(-2px) rotate(45deg);
	}

	@media (max-width: 900px) {
		.utility-wrap,
		.brand-wrap,
		.main-menu {
			width: min(100% - 32px, 1200px);
		}

		.brand-wrap {
			align-items: flex-start;
			gap: 18px;
		}

		.search-link strong {
			display: none;
		}

		.main-menu {
			gap: 28px;
			overflow-x: clip;
			font-size: 18px;
		}
	}

	@media (max-width: 620px) {
		.utility-wrap {
			justify-content: flex-start;
		}

		.brand strong {
			font-size: 24px;
		}

		.main-menu {
			gap: 30px;
		}
	}
</style>
