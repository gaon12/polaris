<script lang="ts">
	import { resolve } from '$app/paths';
	import BrandMark from './BrandMark.svelte';
</script>

<footer class="site-footer" id="help">
	<div>
		<a class="brand footer-brand" href={resolve('/')} aria-label="Polaris 홈">
			<BrandMark small />
			<span>
				<strong>Polaris</strong>
				<small>Online Bulletin System</small>
			</span>
		</a>
		<p>교회 주보를 구조화된 모바일 웹 콘텐츠로 발행하는 서비스입니다.</p>
	</div>
	<nav aria-label="푸터 메뉴">
		<a href={resolve('/')}>개인정보처리방침</a>
		<a href={resolve('/')}>이용약관</a>
		<a href={resolve('/')}>문의하기</a>
		<a href={resolve('/')}>접근성 안내</a>
	</nav>
</footer>

<style>
	.site-footer {
		display: grid;
		width: min(100% - 48px, 1200px);
		grid-template-columns: 1fr auto;
		gap: 32px;
		margin: 0 auto;
		padding: 40px 0 56px;
		border-top: 1px solid #cdd1d5;
		color: #464c53;
		word-break: keep-all;
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 12px;
	}

	.brand strong {
		display: block;
		color: #1e2124;
		font-size: 24px;
		line-height: 1;
	}

	.brand small {
		display: block;
		margin-top: 4px;
		color: #58616a;
		font-size: 11px;
	}

	.footer-brand {
		margin-bottom: 16px;
	}

	p {
		margin: 0;
	}

	nav {
		display: flex;
		align-content: start;
		flex-wrap: wrap;
		gap: 16px 24px;
		font-weight: 700;
	}

	@media (max-width: 900px) {
		.site-footer {
			width: min(100% - 32px, 1200px);
			grid-template-columns: 1fr;
		}
	}
</style>
