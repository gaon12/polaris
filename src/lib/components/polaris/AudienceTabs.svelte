<script lang="ts">
	import type { AudienceTab } from '$lib/polaris/home';

	let {
		tabs
	}: {
		tabs: AudienceTab[];
	} = $props();

	let activeId = $state('editor');
	const activeTab = $derived(tabs.find((tab) => tab.id === activeId) ?? tabs[0]);
</script>

<div class="tabs" role="tablist" aria-label="사용자 유형">
	{#each tabs as tab (tab.id)}
		<button
			id={`audience-${tab.id}-tab`}
			aria-controls={`audience-${tab.id}-panel`}
			aria-selected={activeId === tab.id}
			class:active={activeId === tab.id}
			onclick={() => (activeId = tab.id)}
			role="tab"
			type="button"
		>
			{tab.label}
		</button>
	{/each}
</div>

{#if activeTab}
	<div
		id={`audience-${activeTab.id}-panel`}
		class="quick-grid"
		role="tabpanel"
		aria-labelledby={`audience-${activeTab.id}-tab`}
	>
		<div class="quick-list">
			<article class="quick-card">
				<span>{activeTab.tag}</span>
				<h3>{activeTab.title}</h3>
				<p>{activeTab.description}</p>
				<ul>
					{#each activeTab.actions as action (action)}
						<li>{action}</li>
					{/each}
				</ul>
				<a href="#workflow">편집 흐름 보기</a>
			</article>
		</div>

		<div class="preview-panel" aria-label={`${activeTab.label} 화면 미리보기`}>
			<div class="phone-shell">
				<div class="phone-header">
					<span>은혜샘교회</span>
					<strong>{activeTab.label}</strong>
				</div>
				<div class="phone-card">
					<small>{activeTab.previewMeta}</small>
					<strong>{activeTab.previewTitle}</strong>
					<p>{activeTab.description}</p>
				</div>
				<div class="phone-list">
					{#each activeTab.steps as step (step)}
						<span>{step}</span>
					{/each}
				</div>
				<div class="phone-actions">
					<span>자세히</span>
					<span>공유하기</span>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.tabs {
		display: flex;
		gap: 28px;
		margin-bottom: 24px;
		border-bottom: 1px solid #cdd1d5;
		overflow: hidden;
	}

	.tabs button {
		min-height: 52px;
		border: 0;
		border-bottom: 4px solid transparent;
		background: transparent;
		color: #464c53;
		font-weight: 700;
		cursor: pointer;
		white-space: nowrap;
	}

	.tabs .active,
	.tabs button[aria-selected='true'] {
		border-color: #0b50d0;
		color: #052561;
	}

	.quick-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(360px, 0.85fr);
		gap: 24px;
	}

	.quick-list {
		display: grid;
		gap: 16px;
	}

	.quick-card {
		padding: 28px;
		border: 1px solid #cdd1d5;
		border-radius: 8px;
		background: #ffffff;
	}

	.quick-card span {
		display: inline-flex;
		margin-bottom: 14px;
		padding: 4px 10px;
		border: 1px solid #256ef4;
		border-radius: 4px;
		color: #0b50d0;
		font-size: 15px;
		font-weight: 700;
	}

	h3 {
		margin: 0;
		color: #1e2124;
		font-size: 23px;
		line-height: 1.35;
	}

	.quick-card p {
		margin: 12px 0 0;
		color: #464c53;
		font-size: 17px;
	}

	.quick-card ul {
		display: grid;
		gap: 8px;
		margin: 18px 0 0;
		padding-left: 20px;
		color: #33363d;
		font-weight: 700;
	}

	.quick-card a {
		display: inline-flex;
		margin-top: 20px;
		color: #0b50d0;
		font-weight: 700;
		text-decoration: underline;
		text-underline-offset: 4px;
	}

	.preview-panel {
		display: grid;
		min-height: 420px;
		place-items: center;
		border-radius: 8px;
		background: #eef2f7;
	}

	.phone-shell {
		width: min(280px, 80%);
		padding: 18px;
		border: 10px solid #1e2124;
		border-radius: 28px;
		background: #ffffff;
		box-shadow: 0 24px 60px rgba(3, 22, 58, 0.18);
	}

	.phone-header {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		padding-bottom: 12px;
		border-bottom: 1px solid #e6e8ea;
		font-size: 14px;
	}

	.phone-card,
	.phone-list,
	.phone-actions {
		margin-top: 14px;
	}

	.phone-card {
		padding: 18px;
		border-radius: 8px;
		background: #ecf2fe;
	}

	.phone-card small {
		color: #0b50d0;
		font-weight: 700;
	}

	.phone-card strong {
		display: block;
		margin-top: 8px;
		font-size: 20px;
		line-height: 1.25;
	}

	.phone-list,
	.phone-actions {
		display: grid;
		gap: 8px;
	}

	.phone-list span,
	.phone-actions span {
		padding: 10px 12px;
		border-radius: 6px;
		background: #f4f5f6;
		color: #33363d;
		font-weight: 700;
	}

	.phone-actions {
		grid-template-columns: 1fr 1fr;
	}

	.phone-actions span {
		background: #122b18;
		color: #ffffff;
		text-align: center;
	}

	@media (max-width: 900px) {
		.quick-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 620px) {
		.tabs {
			gap: 30px;
		}
	}
</style>
