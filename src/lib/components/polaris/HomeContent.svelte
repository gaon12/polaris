<script lang="ts">
	import { bulletinBlocks, features, quickLinks, workflow } from '$lib/polaris/home';
</script>

<section class="section intro" id="start" aria-labelledby="start-title">
	<div class="section-heading">
		<p class="eyebrow">시작하기</p>
		<h2 id="start-title">이번 주 주보를 바로 만들 수 있게</h2>
		<p>
			담당자는 익숙한 주보 흐름으로 작성하고, 성도는 모바일에서 읽고 필요한 행동으로 바로
			이어집니다.
		</p>
	</div>

	<div class="tabs" role="tablist" aria-label="사용자 유형">
		<button class="active" type="button">주보 담당자</button>
		<button type="button">목회자</button>
		<button type="button">성도</button>
	</div>

	<div class="quick-grid">
		<div class="quick-list">
			{#each quickLinks as link (link.title)}
				<article class="quick-card">
					<span>{link.tag}</span>
					<h3>{link.title}</h3>
					<p>{link.description}</p>
					<a href="#workflow">{link.action}</a>
				</article>
			{/each}
		</div>
		<div class="preview-panel" aria-label="모바일 주보 미리보기">
			<div class="phone-shell">
				<div class="phone-header">
					<span>은혜샘교회</span>
					<strong>주일예배</strong>
				</div>
				<div class="phone-card">
					<small>오늘의 말씀</small>
					<strong>한 화면에서 이어지는 예배</strong>
					<p>요한복음 3:16-17</p>
				</div>
				<div class="phone-list">
					<span>묵도</span>
					<span>찬양</span>
					<span>성경 봉독</span>
					<span>설교</span>
				</div>
				<div class="phone-actions">
					<span>지도 보기</span>
					<span>문의하기</span>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="section bulletin" id="bulletin" aria-labelledby="bulletin-title">
	<div class="section-heading compact">
		<p class="eyebrow">온라인 주보</p>
		<h2 id="bulletin-title">PDF를 올리는 대신, 항목을 연결합니다</h2>
	</div>

	<div class="bulletin-grid">
		{#each bulletinBlocks as block (block[0])}
			<article>
				<span>{block[0]}</span>
				<h3>{block[1]}</h3>
				<p>{block[2]}</p>
			</article>
		{/each}
	</div>
</section>

<section class="section split" id="workflow" aria-labelledby="workflow-title">
	<div>
		<p class="eyebrow">편집 흐름</p>
		<h2 id="workflow-title">매주 반복되는 일을 여섯 단계로 줄입니다</h2>
		<p>
			Polaris의 편집 경험은 블록 편집과 제한된 리치 텍스트 편집을 분리합니다. 자유롭게 쓰되 공개
			화면은 일관된 주보처럼 렌더링됩니다.
		</p>
	</div>
	<ol class="workflow-list">
		{#each workflow as item, index (item)}
			<li>
				<span>{String(index + 1).padStart(2, '0')}</span>
				<strong>{item}</strong>
			</li>
		{/each}
	</ol>
</section>

<section class="section feature-section" id="church-home" aria-labelledby="feature-title">
	<div class="section-heading compact">
		<p class="eyebrow">교회 홈</p>
		<h2 id="feature-title">주보가 쌓이면 교회의 온라인 거점이 됩니다</h2>
	</div>
	<div class="feature-grid">
		{#each features as feature (feature.title)}
			<article>
				<h3>{feature.title}</h3>
				<p>{feature.description}</p>
			</article>
		{/each}
	</div>
</section>

<section class="section search-section" id="search" aria-labelledby="search-title">
	<div>
		<p class="eyebrow">통합검색</p>
		<h2 id="search-title">지난 주보와 교회 소식을 함께 찾습니다</h2>
	</div>
	<form class="search-box" aria-label="통합검색">
		<label for="query">검색어</label>
		<input
			id="query"
			name="query"
			type="search"
			placeholder="설교 제목, 본문, 행사명을 입력하세요"
		/>
		<button type="submit">검색</button>
	</form>
</section>

<style>
	.section {
		width: min(100% - 48px, 1200px);
		margin: 80px auto 0;
		word-break: keep-all;
		overflow-wrap: break-word;
	}

	.section-heading {
		max-width: 860px;
		margin-bottom: 34px;
	}

	.compact {
		max-width: 760px;
	}

	.eyebrow {
		margin: 0 0 12px;
		color: #0b50d0;
		font-size: 16px;
		font-weight: 700;
	}

	h2 {
		margin: 0;
		font-size: clamp(32px, 4vw, 56px);
		line-height: 1.18;
		letter-spacing: 0;
	}

	.section-heading p:not(.eyebrow),
	.split p {
		margin: 18px 0 0;
		color: #58616a;
		font-size: 20px;
	}

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

	.tabs .active {
		border-color: #0b50d0;
		color: #052561;
	}

	.quick-grid,
	.split,
	.search-section {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(360px, 0.85fr);
		gap: 24px;
	}

	.quick-list {
		display: grid;
		gap: 16px;
	}

	.quick-card,
	.bulletin-grid article,
	.feature-grid article {
		border: 1px solid #cdd1d5;
		border-radius: 8px;
		background: #ffffff;
	}

	.quick-card,
	.bulletin-grid article,
	.feature-grid article {
		padding: 28px;
	}

	.quick-card span,
	.bulletin-grid span {
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

	.quick-card p,
	.bulletin-grid p,
	.feature-grid p {
		margin: 12px 0 0;
		color: #464c53;
		font-size: 17px;
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

	.bulletin {
		padding: 64px 0;
		border-top: 1px solid #e6e8ea;
		border-bottom: 1px solid #e6e8ea;
	}

	.bulletin-grid,
	.feature-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 16px;
	}

	.split {
		grid-template-columns: minmax(0, 0.9fr) minmax(360px, 1fr);
		gap: 54px;
		align-items: start;
	}

	.workflow-list {
		display: grid;
		gap: 12px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.workflow-list li {
		display: flex;
		min-height: 72px;
		align-items: center;
		gap: 18px;
		padding: 18px 22px;
		border: 1px solid #cdd1d5;
		border-radius: 8px;
		background: #ffffff;
	}

	.workflow-list span {
		display: inline-grid;
		width: 38px;
		height: 38px;
		place-items: center;
		border-radius: 50%;
		background: #ecf2fe;
		color: #0b50d0;
		font-size: 14px;
		font-weight: 700;
	}

	.feature-section {
		padding: 64px 0;
	}

	.feature-grid {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.search-section {
		grid-template-columns: minmax(0, 0.8fr) minmax(420px, 1fr);
		align-items: center;
		padding: 40px;
		border: 1px solid #cdd1d5;
		border-radius: 8px;
		background: #f4f5f6;
	}

	.search-box {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 10px;
	}

	.search-box label {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
	}

	.search-box input,
	.search-box button {
		min-height: 64px;
		border-radius: 8px;
	}

	.search-box input {
		min-width: 0;
		padding: 0 18px;
		border: 1px solid #58616a;
		background: #ffffff;
	}

	.search-box button {
		padding: 0 26px;
		border: 1px solid #256ef4;
		background: #256ef4;
		color: #ffffff;
		font-weight: 700;
		cursor: pointer;
	}

	@media (max-width: 900px) {
		.section {
			width: min(100% - 32px, 1200px);
		}

		.quick-grid,
		.split,
		.search-section {
			grid-template-columns: 1fr;
		}

		.bulletin-grid,
		.feature-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 620px) {
		h2 {
			font-size: 32px;
		}

		.tabs {
			gap: 30px;
		}

		.bulletin-grid,
		.feature-grid {
			grid-template-columns: 1fr;
		}

		.search-section {
			padding: 28px 18px;
		}

		.search-box {
			grid-template-columns: 1fr;
		}
	}
</style>
