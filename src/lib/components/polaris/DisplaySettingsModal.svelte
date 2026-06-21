<script lang="ts">
	import { X } from '@lucide/svelte';

	type TextSize = '작게' | '보통' | '조금 크게' | '크게' | '가장 크게';
	type DisplayMode = 'light' | 'dark' | 'system';

	let {
		open,
		onClose
	}: {
		open: boolean;
		onClose: () => void;
	} = $props();

	const textSizes: TextSize[] = ['작게', '보통', '조금 크게', '크게', '가장 크게'];
	const displayModes: Array<{
		id: DisplayMode;
		label: string;
		description: string;
		image: string;
	}> = [
		{
			id: 'light',
			label: '기본 (밝은 배경)',
			description: '대부분의 환경에서 편하게 읽을 수 있어요.',
			image: '/images/settings/mode-light.png'
		},
		{
			id: 'dark',
			label: '선명하게 (어두운 배경)',
			description: '빛이 적은 곳에서 눈부심을 줄여요.',
			image: '/images/settings/mode-dark.png'
		},
		{
			id: 'system',
			label: '시스템 설정',
			description: '기기의 화면 설정을 그대로 따릅니다.',
			image: '/images/settings/mode-system.png'
		}
	];

	let textSize = $state<TextSize>('보통');
	let displayMode = $state<DisplayMode>('light');

	function closeOnEscape(event: KeyboardEvent) {
		if (event.key === 'Escape' && open) {
			onClose();
		}
	}

	function resetSettings() {
		textSize = '보통';
		displayMode = 'light';
	}
</script>

<svelte:window onkeydown={closeOnEscape} />

{#if open}
	<div class="modal-layer">
		<button aria-label="설정 닫기" class="modal-backdrop" onclick={onClose} type="button"></button>
		<div
			id="display-settings"
			aria-labelledby="settings-title"
			aria-modal="true"
			class="modal"
			role="dialog"
		>
			<div class="modal-head">
				<div>
					<h2 id="settings-title">글자·화면 표시 설정</h2>
					<p>온라인 주보를 읽는 환경에 맞게 글자 크기와 화면 모드를 조정하세요.</p>
				</div>
				<button aria-label="설정 닫기" class="icon-button" onclick={onClose} type="button">
					<X aria-hidden="true" size={32} strokeWidth={2} />
				</button>
			</div>

			<section class="setting-section" aria-labelledby="text-size-title">
				<div>
					<h3 id="text-size-title">글자 크기</h3>
					<p>성도들이 말씀과 교회 소식을 더 편하게 읽을 수 있도록 크기를 선택합니다.</p>
				</div>
				<div class="size-options" role="group" aria-label="글자 크기">
					{#each textSizes as option (option)}
						<button
							class:active={textSize === option}
							onclick={() => (textSize = option)}
							type="button"
						>
							{option}
						</button>
					{/each}
				</div>
			</section>

			<section class="setting-section" aria-labelledby="display-mode-title">
				<div>
					<h3 id="display-mode-title">화면 표시 모드</h3>
					<p>밝은 배경, 어두운 배경, 기기 설정 중에서 읽기 편한 방식을 고릅니다.</p>
				</div>
				<div class="mode-options">
					{#each displayModes as mode (mode.id)}
						<label class:active={displayMode === mode.id} class="mode-option">
							<span class="mode-visual" aria-hidden="true">
								<img src={mode.image} alt="" />
							</span>
							<input bind:group={displayMode} name="displayMode" type="radio" value={mode.id} />
							<span class="mode-copy">
								<strong>{mode.label}</strong>
								<small>{mode.description}</small>
							</span>
						</label>
					{/each}
				</div>
			</section>

			<div class="modal-actions">
				<button class="secondary" onclick={resetSettings} type="button">초기화</button>
				<button class="primary" onclick={onClose} type="button">닫기</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-layer {
		position: fixed;
		inset: 0;
		z-index: 20;
		display: grid;
		place-items: center;
		padding: 24px;
	}

	.modal-backdrop {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 0;
		background: rgba(19, 20, 22, 0.52);
		cursor: pointer;
	}

	.modal {
		position: relative;
		width: min(100%, 640px);
		max-height: min(760px, calc(100vh - 48px));
		overflow: auto;
		border: 1px solid #cdd1d5;
		border-radius: 16px;
		background: #ffffff;
		box-shadow: 0 24px 60px rgba(3, 22, 58, 0.22);
		color: #1e2124;
		word-break: keep-all;
		overflow-wrap: break-word;
	}

	.modal-head {
		display: flex;
		justify-content: space-between;
		gap: 24px;
		padding: 34px 32px 14px;
	}

	.modal-head h2,
	.modal-head p,
	.setting-section h3,
	.setting-section p {
		margin: 0;
	}

	.modal-head h2 {
		font-size: 30px;
		line-height: 1.25;
	}

	.modal-head p,
	.setting-section p,
	.mode-copy small {
		color: #58616a;
	}

	.modal-head p {
		margin-top: 10px;
		font-size: 16px;
	}

	.icon-button {
		display: grid;
		place-items: center;
		width: 48px;
		height: 48px;
		flex: 0 0 auto;
		border: 0;
		background: transparent;
		cursor: pointer;
	}

	.setting-section {
		display: grid;
		gap: 18px;
		padding: 24px 32px 0;
	}

	.setting-section h3 {
		font-size: 20px;
		line-height: 1.35;
	}

	.setting-section p {
		margin-top: 8px;
		font-size: 16px;
	}

	.size-options {
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		gap: 8px;
	}

	.size-options button {
		min-height: 48px;
		border: 1px solid #cdd1d5;
		border-radius: 8px;
		background: #ffffff;
		color: #1e2124;
		cursor: pointer;
		font-weight: 700;
	}

	.size-options .active {
		border-color: #256ef4;
		background: #ecf2fe;
		color: #0b50d0;
	}

	.mode-options {
		display: grid;
		gap: 16px;
	}

	.mode-option {
		display: grid;
		grid-template-columns: 150px 28px minmax(0, 1fr);
		align-items: center;
		gap: 18px;
		padding: 4px 0;
		cursor: pointer;
	}

	.mode-option input {
		width: 26px;
		height: 26px;
		margin: 0;
		accent-color: #256ef4;
	}

	.mode-copy {
		display: grid;
		gap: 5px;
		font-size: 20px;
		line-height: 1.35;
	}

	.mode-copy small {
		font-size: 15px;
		font-weight: 500;
	}

	.mode-visual {
		display: block;
		width: 150px;
		height: 80px;
		overflow: hidden;
		border-radius: 8px;
		background: #dbe6f7;
	}

	.mode-option.active .mode-visual {
		outline: 3px solid #256ef4;
		outline-offset: 2px;
	}

	.mode-visual img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.modal-actions {
		display: flex;
		justify-content: flex-end;
		gap: 10px;
		padding: 24px 32px 32px;
	}

	.modal-actions button {
		min-width: 98px;
		min-height: 58px;
		border-radius: 8px;
		cursor: pointer;
		font: inherit;
		font-weight: 700;
	}

	.secondary {
		border: 1px solid #58616a;
		background: #ffffff;
		color: #1e2124;
	}

	.primary {
		border: 1px solid #256ef4;
		background: #256ef4;
		color: #ffffff;
	}

	@media (max-width: 620px) {
		.modal-layer {
			align-items: end;
			padding: 12px;
		}

		.modal {
			max-height: min(760px, calc(100vh - 24px));
		}

		.modal-head,
		.setting-section,
		.modal-actions {
			padding-right: 22px;
			padding-left: 22px;
		}

		.size-options {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.mode-option {
			grid-template-columns: 112px 26px minmax(0, 1fr);
			gap: 12px;
		}

		.mode-visual {
			width: 112px;
			height: 72px;
		}

		.mode-copy {
			font-size: 17px;
		}
	}
</style>
