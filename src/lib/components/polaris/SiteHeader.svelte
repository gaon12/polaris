<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import type { MenuItem } from '$lib/polaris/home';
	import { Globe, Menu, Search, X } from '@lucide/svelte';
	import BrandMark from './BrandMark.svelte';
	import DisplaySettingsModal from './DisplaySettingsModal.svelte';
	import './SiteHeader.css';

	let {
		menuItems
	}: {
		menuItems: MenuItem[];
	} = $props();

	type Locale = (typeof locales)[number];

	let settingsOpen = $state(false);
	let mobileMenuOpen = $state(false);
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
		mobileMenuOpen = false;
	}

	function toggleMenu(item: MenuItem) {
		activeMenu = activeMenu === item.label ? null : item.label;
	}

	function openMenuTarget(item: MenuItem) {
		scrollToTarget(item.href);
		activeMenu = null;
	}

	function openSettings() {
		settingsOpen = true;
		mobileMenuOpen = false;
	}

	function closeHeaderOnEscape(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			mobileMenuOpen = false;
		}
	}
</script>

<svelte:window onkeydown={closeHeaderOnEscape} />

<a class="skip-link" href="#main">본문 바로가기</a>

<header class="site-header">
	<div class="utility-wrap">
		<div class="utility" aria-label="보조 메뉴">
			<div class="utility-item">
				<label class="language-control">
					<Globe aria-hidden="true" size={18} strokeWidth={2.1} />
					<span class="visually-hidden">언어</span>
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
			</div>
			<span class="divider" aria-hidden="true"></span>
			<button
				aria-controls="display-settings"
				class="utility-item settings-trigger"
				type="button"
				onclick={openSettings}>글자·화면 설정</button
			>
			<span class="divider" aria-hidden="true"></span>
			<a class="utility-item utility-link" href={resolve('/login')}>로그인</a>
			<a class="utility-item utility-link signup-link" href={resolve('/signup')}>회원가입</a>
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
		<div class="header-actions">
			<button class="search-link" onclick={() => scrollToTarget('#search')} type="button">
				<Search aria-hidden="true" size={22} strokeWidth={2.2} />
				<strong>통합검색</strong>
			</button>
			<button
				aria-controls="mobile-menu-panel"
				aria-expanded={mobileMenuOpen}
				aria-label={mobileMenuOpen ? '전체메뉴 닫기' : '전체메뉴 열기'}
				class="mobile-menu-trigger"
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
				type="button"
			>
				{#if mobileMenuOpen}
					<X aria-hidden="true" size={28} strokeWidth={2.2} />
				{:else}
					<Menu aria-hidden="true" size={28} strokeWidth={2.2} />
				{/if}
				<span class="visually-hidden">전체메뉴</span>
			</button>
		</div>
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
		<div class="menu-detail desktop-menu-detail" id="menu-detail-panel">
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

	{#if mobileMenuOpen}
		<div class="mobile-menu-layer">
			<button
				aria-label="전체메뉴 닫기"
				class="mobile-menu-backdrop"
				onclick={() => (mobileMenuOpen = false)}
				type="button"
			></button>
			<aside aria-label="전체메뉴" class="mobile-menu-panel" id="mobile-menu-panel">
				<div class="mobile-menu-head">
					<strong>전체메뉴</strong>
					<button aria-label="전체메뉴 닫기" onclick={() => (mobileMenuOpen = false)} type="button">
						<X aria-hidden="true" size={28} strokeWidth={2.2} />
					</button>
				</div>
				<div class="mobile-utility" aria-label="모바일 보조 메뉴">
					<div class="mobile-auth">
						<a href={resolve('/login')}>로그인</a>
						<a class="signup-link" href={resolve('/signup')}>회원가입</a>
					</div>
					<label class="language-control">
						<Globe aria-hidden="true" size={18} strokeWidth={2.1} />
						<span class="visually-hidden">언어</span>
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
					<button
						aria-controls="display-settings"
						class="settings-trigger"
						type="button"
						onclick={openSettings}>글자·화면 설정</button
					>
				</div>
				<nav class="mobile-menu" aria-label="모바일 주 메뉴">
					{#each menuItems as item (item.label)}
						<button
							aria-controls="mobile-menu-detail"
							aria-expanded={activeMenu === item.label}
							class:active={activeMenu === item.label}
							onclick={() => toggleMenu(item)}
							type="button"
						>
							<span>{item.label}</span>
							<span class="chevron" aria-hidden="true"></span>
						</button>
					{/each}
				</nav>
				{#if activeMenuItem}
					<div class="menu-detail mobile-menu-detail" id="mobile-menu-detail">
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
			</aside>
		</div>
	{/if}
</header>

<DisplaySettingsModal open={settingsOpen} onClose={() => (settingsOpen = false)} />
