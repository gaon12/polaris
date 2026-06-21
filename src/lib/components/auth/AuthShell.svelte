<script lang="ts">
	import { resolve } from '$app/paths';
	import BrandMark from '$lib/components/polaris/BrandMark.svelte';

	let {
		mode,
		message = '',
		success = false
	}: {
		mode: 'login' | 'signup';
		message?: string;
		success?: boolean;
	} = $props();

	const isLogin = $derived(mode === 'login');
</script>

<main class="auth-page">
	<section class="auth-panel" class:signup={!isLogin} aria-labelledby="auth-title">
		<a class="brand" href={resolve('/')} aria-label="Polaris 홈">
			<BrandMark />
			<span>
				<strong>Polaris</strong>
				<small>Online Bulletin System</small>
			</span>
		</a>

		<div class="copy">
			<p>{isLogin ? '다시 오신 것을 환영합니다' : '교회 가입 승인 요청'}</p>
			<h1 id="auth-title">{isLogin ? '로그인' : '가입 신청'}</h1>
			<span>
				{isLogin
					? '주보 편집과 발행 상태를 확인하려면 로그인하세요.'
					: '대표자 또는 위임받은 교회 직원이 신청하면 교회 정보를 확인한 뒤 승인합니다.'}
			</span>
		</div>

		<form method="post">
			{#if !isLogin}
				<label>
					신청자 이름
					<input autocomplete="name" name="name" placeholder="홍길동" required />
				</label>
				<label>
					교회 이름
					<input name="churchName" placeholder="은혜샘교회" required />
				</label>
				<label>
					신청자 역할
					<select name="role" required>
						<option value="">선택해주세요</option>
						<option value="representative">대표자 또는 담임목회자</option>
						<option value="staff">위임받은 교회 직원</option>
						<option value="bulletin-manager">주보 담당자</option>
					</select>
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
			{#if !isLogin}
				<label>
					연락처
					<input autocomplete="tel" name="phone" placeholder="010-0000-0000" required />
				</label>
				<label>
					교단 또는 소속
					<input name="denomination" placeholder="예: 대한예수교장로회" />
				</label>
				<label>
					교회 홈페이지 또는 공개 링크
					<input name="website" placeholder="https://church.example" type="url" />
				</label>
				<label>
					확인 메모
					<textarea
						name="note"
						placeholder="대표자 확인 방법, 교회 연락처, 담당 부서 등을 적어주세요"
						rows="4"></textarea>
				</label>
				<label class="check">
					<input name="approvalCheck" required type="checkbox" />
					<span>교회 정보 확인과 승인 검토 후 계정이 열리는 것에 동의합니다.</span>
				</label>
			{/if}
			{#if isLogin}
				<label>
					비밀번호
					<input
						autocomplete="current-password"
						minlength="8"
						name="password"
						placeholder="8자 이상"
						required
						type="password"
					/>
				</label>
			{/if}
			<button type="submit">{isLogin ? '로그인' : '가입 신청 보내기'}</button>
		</form>

		{#if message}
			<p class:success class="message" role="alert">{message}</p>
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

	.auth-panel.signup {
		width: min(100%, 640px);
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

	input,
	select,
	textarea {
		width: 100%;
		min-width: 0;
		border: 1px solid #58616a;
		border-radius: 8px;
		font: inherit;
	}

	input,
	select {
		min-height: 56px;
		padding: 0 16px;
	}

	textarea {
		padding: 14px 16px;
		resize: vertical;
	}

	.check {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		color: #33363d;
		font-weight: 600;
	}

	.check input {
		width: 20px;
		min-width: 20px;
		height: 20px;
		min-height: 20px;
		margin-top: 2px;
	}

	.check span {
		line-height: 1.5;
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

	.message.success {
		color: #118d3f;
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
