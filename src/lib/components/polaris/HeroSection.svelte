<section class="hero" aria-labelledby="hero-title">
	<img src="/images/polaris-hero.png" alt="" />
	<div class="hero-copy">
		<p class="eyebrow">온라인 주보 시스템</p>
		<h1 id="hero-title">교회 주보를 모바일로</h1>
		<p>
			예배 순서, 말씀, 소식, 행사 신청, 헌금 안내, 새가족 연결까지 모바일에서 보기 좋은 구조화
			콘텐츠로 발행합니다.
		</p>
		<div class="hero-actions">
			<a class="button primary" href="#bulletin">샘플 주보 보기</a>
			<a class="button secondary" href="#workflow">발행 흐름 보기</a>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		width: min(100% - 48px, 1200px);
		min-height: 480px;
		margin: 24px auto 84px;
		overflow: hidden;
		border-radius: 8px;
		background: #03163a;
	}

	.hero img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.hero::after {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			90deg,
			rgba(3, 22, 58, 0.96) 0%,
			rgba(3, 22, 58, 0.8) 38%,
			rgba(3, 22, 58, 0.08) 72%
		);
		content: '';
	}

	.hero-copy {
		position: relative;
		z-index: 1;
		width: min(620px, 100%);
		padding: clamp(42px, 8vw, 96px) clamp(28px, 7vw, 80px);
		color: #ffffff;
		word-break: keep-all;
		overflow-wrap: break-word;
	}

	.eyebrow {
		margin: 0 0 12px;
		color: #9ed2fa;
		font-size: 16px;
		font-weight: 700;
	}

	h1 {
		margin: 0;
		font-size: clamp(34px, 4.2vw, 56px);
		line-height: 1.18;
		letter-spacing: 0;
	}

	p:not(.eyebrow) {
		max-width: 520px;
		margin: 24px 0 0;
		color: #e6e8ea;
		font-size: clamp(18px, 2vw, 23px);
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 36px;
	}

	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 64px;
		padding: 0 28px;
		border: 1px solid transparent;
		border-radius: 8px;
		font-size: 18px;
		font-weight: 700;
	}

	.primary {
		background: #256ef4;
		color: #ffffff;
	}

	.secondary {
		border-color: #86aff9;
		background: rgba(236, 242, 254, 0.08);
		color: #ffffff;
	}

	@media (max-width: 900px) {
		.hero {
			width: min(100% - 32px, 1200px);
			min-height: auto;
			margin-bottom: 64px;
		}

		.hero::after {
			background: linear-gradient(
				180deg,
				rgba(3, 22, 58, 0.98),
				rgba(3, 22, 58, 0.76) 72%,
				rgba(3, 22, 58, 0.38)
			);
		}

		.hero img {
			object-position: 62% center;
		}
	}

	@media (max-width: 620px) {
		.hero {
			margin-top: 24px;
			margin-bottom: 56px;
		}

		.hero-copy {
			padding: 34px 22px 28px;
		}

		h1 {
			max-width: 9em;
			font-size: 32px;
		}

		p:not(.eyebrow) {
			font-size: 18px;
		}

		.hero-actions {
			display: grid;
			grid-template-columns: 1fr;
			width: 100%;
			margin-top: 34px;
		}

		.button {
			width: 100%;
		}
	}
</style>
