import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { churchSignupRequest } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = (event) => {
	if (event.locals.user) {
		return redirect(302, '/');
	}
	return {};
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email')?.toString() ?? '';
		const name = formData.get('name')?.toString() ?? '';
		const phone = formData.get('phone')?.toString() ?? '';
		const churchName = formData.get('churchName')?.toString() ?? '';
		const role = formData.get('role')?.toString() ?? '';
		const denomination = formData.get('denomination')?.toString() ?? '';
		const website = formData.get('website')?.toString() ?? '';
		const note = formData.get('note')?.toString() ?? '';
		const approved = formData.get('approvalCheck') === 'on';

		if (!name || !email || !phone || !churchName || !role) {
			return fail(400, {
				message: '이름, 이메일, 연락처, 교회 이름, 신청자 역할을 모두 입력해주세요.'
			});
		}

		if (!approved) {
			return fail(400, { message: '승인 검토와 교회 확인 절차에 동의해야 신청할 수 있습니다.' });
		}

		await db.insert(churchSignupRequest).values({
			applicantName: name,
			applicantEmail: email,
			phone,
			churchName,
			role,
			denomination: denomination || null,
			website: website || null,
			note: note || null
		});

		return {
			success: true,
			message: '가입 신청이 접수되었습니다. 교회 정보 확인 후 승인 안내를 보내드리겠습니다.'
		};
	}
};
