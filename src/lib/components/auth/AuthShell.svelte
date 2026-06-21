<script lang="ts">
	import { resolve } from '$app/paths';
	import BrandMark from '$lib/components/polaris/BrandMark.svelte';

	let {
		mode,
		message = ''
	}: {
		mode: 'login' | 'signup';
		message?: string;
	} = $props();

	const isLogin = $derived(mode === 'login');
</script>

<main class="auth-page">
	<section class="auth-panel" aria-labelledby="auth-title">
		<a class="brand" href={resolve('/')} aria-label="Polaris 홈">
			<BrandMark />
			<span>
				<strong>Polaris</strong>
				<small>Online Bulletin System</small>
			</span>
		</a>

		<div class="copy">
			<p>{isLogin ? '다시 오신 것을 환영합니다' : '교회 주보 발행을 시작하세요'}</p>
			<h1 id="auth-title">{isLogin ? '로그인' : '회원가입'}</h1>
			<span>
				{isLogin
					? '주보 편집과 발행 상태를 확인하려면 로그인하세요.'
					: '교회 담당자 계정을 만들고 모바일 주보를 준비하세요.'}
			</span>
		</div>

		<form method="post">
			{#if !isLogin}
				<label>
					이름
					<input autocomplete="name" name="name" placeholder="홍길동" required />
				</label>
			{/if}
			<label>
				이메일
				<input
					autocomplete="email"
					name="email"
					placeholder="name@example.com"
					required
					type="email"
				/>
			</label>
			<label>
				비밀번호
				<input
					autocomplete={isLogin ? 'current-password' : 'new-password'}
					minlength="8"
					name="password"
					placeholder="8자 이상"
					required
					type="password"
				/>
			</label>
			<button type="submit">{isLogin ? '로그인' : '계정 만들기'}</button>
		</form>

		{#if message}
			<p class="message" role="alert">{message}</p>
		{/if}

		<p class="switch">
			{isLogin ? '아직 계정이 없나요?' : '이미 계정이 있나요?'}
			<a href={resolve(isLogin ? '/signup' : '/login')}>{isLogin ? '회원가입' : '로그인'}</a>
		</p>
	</section>
</main>

<style>
	.auth-page {
		display: grid;
		min-height: 100vh;
		place-items: center;
		padding: 40px 16px;
		background: #f4f5f6;
		color: #1e2124;
		word-break: keep-all;
	}

	.auth-panel {
		width: min(100%, 460px);
		padding: 34px;
		border: 1px solid #cdd1d5;
		border-radius: 8px;
		background: #ffffff;
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 34px;
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

	.copy p,
	.copy h1,
	.copy span {
		margin: 0;
	}

	.copy p {
		color: #0b50d0;
		font-weight: 700;
	}

	h1 {
		margin-top: 10px;
		font-size: 40px;
		line-height: 1.2;
	}

	.copy span {
		display: block;
		margin-top: 12px;
		color: #58616a;
		font-size: 17px;
	}

	form {
		display: grid;
		gap: 18px;
		margin-top: 30px;
	}

	label {
		display: grid;
		gap: 8px;
		font-weight: 700;
	}

	input {
		min-height: 56px;
		padding: 0 16px;
		border: 1px solid #58616a;
		border-radius: 8px;
		font: inherit;
	}

	button {
		min-height: 58px;
		border: 1px solid #256ef4;
		border-radius: 8px;
		background: #256ef4;
		color: #ffffff;
		cursor: pointer;
		font: inherit;
		font-weight: 700;
	}

	.message {
		margin: 18px 0 0;
		color: #bd2c0f;
		font-weight: 700;
	}

	.switch {
		margin: 24px 0 0;
		color: #464c53;
	}

	.switch a {
		margin-left: 8px;
		color: #0b50d0;
		font-weight: 700;
		text-decoration: underline;
		text-underline-offset: 4px;
	}

	@media (max-width: 520px) {
		.auth-panel {
			padding: 28px 20px;
		}
	}
</style>
