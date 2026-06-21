<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import type { MenuItem } from '$lib/polaris/home';
	import BrandMark from './BrandMark.svelte';
	import DisplaySettingsModal from './DisplaySettingsModal.svelte';

	let {
		menuItems
	}: {
		menuItems: MenuItem[];
	} = $props();

	type Locale = (typeof locales)[number];

	let settingsOpen = $state(false);
	let selectedLocale = $state<Locale>('ko');
	let activeMenu = $state<string | null>(null);
	const activeMenuItem = $derived(menuItems.find((item) => item.label === activeMenu));

	function changeLanguage(event: Event) {
		const target = event.currentTarget as HTMLSelectElement;
		selectedLocale = target.value as Locale;
		const href = resolve(localizeHref(page.url.pathname, { locale: selectedLocale }) as Pathname);
		window.location.href = href;
	}

	function scrollToTarget(target: string) {
		document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
	}

	function toggleMenu(item: MenuItem) {
		activeMenu = activeMenu === item.label ? null : item.label;
	}

	function openMenuTarget(item: MenuItem) {
		scrollToTarget(item.href);
		activeMenu = null;
	}
</script>

<a class="skip-link" href="#main">본문 바로가기</a>

<header class="site-header">
	<div class="utility-wrap">
		<div class="utility" aria-label="보조 메뉴">
			<label class="language-control">
				<span class="globe-icon" aria-hidden="true"></span>
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
			<button
				aria-controls="display-settings"
				class="settings-trigger"
				type="button"
				onclick={() => (settingsOpen = true)}>글자·화면 설정</button
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
			<button
				aria-controls="menu-detail-panel"
				aria-expanded={activeMenu === item.label}
				class:active={activeMenu === item.label}
				onclick={() => toggleMenu(item)}
				type="button"
			>
				{item.label}
				<span class="chevron" aria-hidden="true"></span>
			</button>
		{/each}
	</nav>

	{#if activeMenuItem}
		<div class="menu-detail" id="menu-detail-panel">
			<div>
				<p>메뉴 상세</p>
				<h2>{activeMenuItem.label}</h2>
				<span>{activeMenuItem.summary}</span>
			</div>
			<ul>
				{#each activeMenuItem.points as point (point)}
					<li>{point}</li>
				{/each}
			</ul>
			<button type="button" onclick={() => openMenuTarget(activeMenuItem)}
				>{activeMenuItem.action}</button
			>
		</div>
	{/if}
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
		padding: 14px 0 6px;
	}

	.utility {
		display: flex;
		align-items: center;
		gap: 12px;
		color: #33363d;
		font-size: 15px;
	}

	label {
		display: inline-flex;
		align-items: center;
		gap: 8px;
	}

	label > span:not(.globe-icon) {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
	}

	.language-control {
		min-height: 36px;
		gap: 6px;
	}

	.globe-icon {
		position: relative;
		display: inline-block;
		width: 18px;
		height: 18px;
		border: 1.8px solid currentColor;
		border-radius: 50%;
	}

	.globe-icon::before,
	.globe-icon::after {
		position: absolute;
		content: '';
	}

	.globe-icon::before {
		inset: 3px 5px;
		border-right: 1.5px solid currentColor;
		border-left: 1.5px solid currentColor;
		border-radius: 50%;
	}

	.globe-icon::after {
		top: 7px;
		left: 2px;
		width: 12px;
		border-top: 1.5px solid currentColor;
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
		padding: 0 18px 0 0;
		border-color: transparent;
		background: transparent;
		appearance: none;
	}

	.settings-trigger {
		padding: 0 4px;
		border-color: transparent;
		background: transparent;
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

	.main-menu button.active {
		color: #0b50d0;
	}

	.chevron {
		width: 8px;
		height: 8px;
		border-right: 2px solid currentColor;
		border-bottom: 2px solid currentColor;
		transform: translateY(-2px) rotate(45deg);
	}

	.main-menu button.active .chevron {
		transform: translateY(2px) rotate(225deg);
	}

	.menu-detail {
		display: grid;
		grid-template-columns: minmax(0, 0.9fr) minmax(260px, 1fr) auto;
		gap: 28px;
		width: min(100% - 48px, 1200px);
		margin: 0 auto 20px;
		padding: 24px;
		border: 1px solid #cdd1d5;
		border-radius: 8px;
		background: #f8f8f8;
		color: #1e2124;
		word-break: keep-all;
		overflow-wrap: break-word;
	}

	.menu-detail p,
	.menu-detail h2,
	.menu-detail span {
		margin: 0;
	}

	.menu-detail p {
		color: #0b50d0;
		font-weight: 700;
	}

	.menu-detail h2 {
		margin-top: 8px;
		font-size: 28px;
		line-height: 1.25;
	}

	.menu-detail span {
		display: block;
		margin-top: 10px;
		color: #464c53;
	}

	.menu-detail ul {
		display: grid;
		gap: 8px;
		margin: 0;
		padding-left: 20px;
		color: #33363d;
	}

	.menu-detail button {
		align-self: center;
		min-height: 48px;
		padding: 0 18px;
		border: 1px solid #256ef4;
		border-radius: 6px;
		background: #256ef4;
		color: #ffffff;
		cursor: pointer;
		font-weight: 700;
		white-space: nowrap;
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

		.menu-detail {
			grid-template-columns: 1fr;
			width: min(100% - 32px, 1200px);
		}

		.menu-detail button {
			justify-self: start;
		}
	}

	@media (max-width: 620px) {
		.utility-wrap {
			justify-content: flex-end;
		}

		.brand strong {
			font-size: 24px;
		}

		.main-menu {
			gap: 30px;
		}
	}
</style>
