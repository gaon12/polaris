export type MenuItem = {
	label: string;
	href: string;
	summary: string;
	points: string[];
	action: string;
};

export type AudienceTab = {
	id: string;
	label: string;
	tag: string;
	title: string;
	description: string;
	actions: string[];
	previewTitle: string;
	previewMeta: string;
	steps: string[];
};

export const menuItems: MenuItem[] = [
	{
		label: '시작하기',
		href: '#start',
		summary: '교회 안에서 누가 어떤 흐름으로 온라인 주보를 쓰는지 먼저 확인합니다.',
		points: [
			'담당자, 목회자, 성도별 화면 흐름',
			'처음 발행까지 필요한 최소 정보',
			'승인된 교회 계정 중심 운영'
		],
		action: '사용자 흐름 보기'
	},
	{
		label: '온라인 주보',
		href: '#bulletin',
		summary: 'PDF 한 장이 아니라 예배, 설교, 소식, 신청을 각각 연결된 항목으로 발행합니다.',
		points: [
			'예배 순서와 설교 본문 구조화',
			'행사 신청과 지도, 전화 연결',
			'모바일에서 읽기 좋은 카드형 구성'
		],
		action: '주보 구성 보기'
	},
	{
		label: '편집 흐름',
		href: '#workflow',
		summary: '매주 반복되는 주보 제작을 복제, 수정, 검토, 발행 단계로 단순화합니다.',
		points: ['지난 주보 복제', '블록 단위 편집', '모바일 미리보기와 QR 발행'],
		action: '발행 단계 보기'
	},
	{
		label: '교회 홈',
		href: '#church-home',
		summary: '주보를 꾸준히 발행하면 교회 소개, 위치, 연락처가 함께 정리됩니다.',
		points: ['예배 시간과 장소 안내', '교회 연락처와 지도 연결', '작은 교회를 위한 온라인 거점'],
		action: '교회 홈 기능 보기'
	},
	{
		label: '도움말',
		href: '#help',
		summary: '처음 쓰는 교회도 발행 정책과 검수 기준을 확인하고 안전하게 시작합니다.',
		points: ['가입 승인 절차', '주보 발행 체크리스트', '교회 정보 보호와 운영 가이드'],
		action: '도움말 보기'
	}
];

export const audienceTabs: AudienceTab[] = [
	{
		id: 'editor',
		label: '주보 담당자',
		title: '이번 주 주보를 복제하고 바로 수정하세요',
		description: '예배 순서, 설교, 광고, 행사, 헌금 안내를 블록 단위로 정리합니다.',
		tag: '주보 발행',
		actions: ['지난 주보 복제', '순서와 광고 수정', '모바일 미리보기 확인'],
		previewTitle: '담당자 편집 보드',
		previewMeta: '6개 블록 검토 중',
		steps: ['예배 순서', '설교', '교회 소식', '행사 신청']
	},
	{
		id: 'pastor',
		label: '목회자',
		title: '말씀과 목회 일정을 한 곳에서 확인하세요',
		description: '설교 제목, 본문, 기도 제목, 목양 공지를 담당자에게 넘기기 전에 검토합니다.',
		tag: '말씀 검토',
		actions: ['설교 본문 확인', '기도 제목 전달', '발행 전 최종 승인'],
		previewTitle: '목회자 검토 화면',
		previewMeta: '설교·공지 승인 대기',
		steps: ['본문', '설교 제목', '기도 제목', '목회 공지']
	},
	{
		id: 'member',
		label: '성도',
		title: '모바일에서 읽고 바로 누르는 주보를 만납니다',
		description: '성도는 예배 순서와 교회 소식을 읽고, 지도 보기와 행사 신청까지 바로 이어갑니다.',
		tag: '공개 주보',
		actions: ['예배 순서 확인', '행사 신청', '지도와 연락처 열기'],
		previewTitle: '성도 모바일 주보',
		previewMeta: '오늘의 예배 안내',
		steps: ['묵도', '찬양', '성경 봉독', '설교']
	}
];

export const bulletinBlocks = [
	['예배 안내', '2026년 6월 21일 주일예배', '오전 11:00 본당'],
	['설교', '흩어진 정보를 하나로 연결하는 믿음', '요한복음 3:16-17'],
	['교회 소식', '새가족 환영 모임, 여름 수련회 신청', '신청 링크 연결'],
	['상호작용', '지도, 전화, 이메일, QR 공유', '누를 수 있는 주보']
];

export const features = [
	{
		title: '구조화된 주보',
		description: 'PDF 한 장 대신 예배 순서, 설교, 성경 본문, 광고, 행사를 데이터로 관리합니다.'
	},
	{
		title: '한국 교회 공유 방식',
		description: '카카오톡, 문자, QR코드, 네이버 지도, 유튜브 링크 공유를 처음부터 고려합니다.'
	},
	{
		title: '작은 교회 홈',
		description: '주보를 쓰다 보면 예배 시간, 위치, 연락처가 담긴 미니 홈페이지가 함께 완성됩니다.'
	}
];

export const workflow = [
	'지난 주보 복제',
	'이번 주 예배 정보 입력',
	'설교와 본문 연결',
	'소식과 행사 카드 정리',
	'모바일 미리보기 확인',
	'공유 링크와 QR 발행'
];
