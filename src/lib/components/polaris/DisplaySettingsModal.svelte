<script lang="ts">
	let {
		open,
		onClose
	}: {
		open: boolean;
		onClose: () => void;
	} = $props();

	let textScale = $state('보통');
	let contrast = $state('기본');

	function closeOnEscape(event: KeyboardEvent) {
		if (event.key === 'Escape' && open) {
			onClose();
		}
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
					<p>화면 설정</p>
					<h2 id="settings-title">읽기 편한 화면으로 조정</h2>
				</div>
				<button aria-label="설정 닫기" class="icon-button" onclick={onClose} type="button">×</button
				>
			</div>

			<div class="setting-group">
				<strong>글자 크기</strong>
				<div class="segmented" role="group" aria-label="글자 크기">
					{#each ['작게', '보통', '크게'] as option (option)}
						<button
							class:active={textScale === option}
							onclick={() => (textScale = option)}
							type="button"
						>
							{option}
						</button>
					{/each}
				</div>
			</div>

			<div class="setting-group">
				<strong>화면 대비</strong>
				<div class="segmented" role="group" aria-label="화면 대비">
					{#each ['기본', '선명하게'] as option (option)}
						<button
							class:active={contrast === option}
							onclick={() => (contrast = option)}
							type="button"
						>
							{option}
						</button>
					{/each}
				</div>
			</div>

			<p class="helper">
				설정 UI는 먼저 화면 구조를 잡아둔 상태입니다. 실제 저장은 사용자 설정 저장소와 연결하면
				됩니다.
			</p>
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
		width: min(100%, 480px);
		border-radius: 8px;
		background: #ffffff;
		box-shadow: 0 24px 60px rgba(3, 22, 58, 0.22);
		color: #1e2124;
	}

	.modal-head {
		display: flex;
		justify-content: space-between;
		gap: 20px;
		padding: 28px 28px 18px;
		border-bottom: 1px solid #e6e8ea;
	}

	.modal-head p {
		margin: 0 0 6px;
		color: #0b50d0;
		font-weight: 700;
	}

	.modal-head h2 {
		margin: 0;
		font-size: 24px;
		line-height: 1.3;
	}

	.icon-button {
		width: 44px;
		height: 44px;
		border: 1px solid #cdd1d5;
		border-radius: 8px;
		background: #ffffff;
		font-size: 28px;
		line-height: 1;
		cursor: pointer;
	}

	.setting-group {
		display: grid;
		gap: 12px;
		padding: 22px 28px 0;
	}

	.segmented {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
		gap: 8px;
	}

	.segmented button {
		min-height: 48px;
		border: 1px solid #cdd1d5;
		border-radius: 8px;
		background: #ffffff;
		cursor: pointer;
		font-weight: 700;
	}

	.segmented .active {
		border-color: #256ef4;
		background: #ecf2fe;
		color: #0b50d0;
	}

	.helper {
		margin: 0;
		padding: 22px 28px 28px;
		color: #58616a;
		font-size: 15px;
		word-break: keep-all;
	}
</style>
