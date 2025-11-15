# Career Keyword Search Prototype

진로 직업 검색 프로토타입 - 단순 키워드 기반, AI 없음

## 📦 프로젝트 구조

- `web/` - Next.js 앱 (TypeScript, App Router)
- `01_init_schema.sql` - Supabase 스키마 + 시드 데이터 (50개 직업)
- `supabase.sql` - 간소화된 스키마 (백업)
- `plan.md` - 원본 전체 계획
- `prototype_plan.md` - MVP 프로토타입 계획

## 🚀 빠른 시작

### 1. Supabase 설정
```sql
-- Supabase SQL Editor에서 실행
-- 01_init_schema.sql 전체 복사 붙여넣기
```

### 2. 환경변수 설정
```bash
cd web
cp .env.local.example .env.local
# .env.local 편집: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_ANON_KEY 입력
```

### 3. 설치 및 실행
```bash
cd web
npm install
npm run dev
```

http://localhost:3000 에서 확인

## 🛠 기술 스택

- **Frontend:** Next.js 16 (React, TypeScript)
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Search:** ILIKE + pg_trgm 인덱스

## 📌 주요 기능

- 키워드 기반 직업 검색 (이름/설명/카테고리)
- 카테고리 필터 (IT, 의료, 교육, 제조, 공학, 금융, 미디어)
- 직업 상세 정보 (연봉, 전망, 설명)

## 📂 API 엔드포인트

- `GET /api/jobs/search?keyword=XXX` - 키워드 검색
- `GET /api/jobs/category/[category]` - 카테고리 필터
- `GET /api/jobs/[id]` - 단일 직업 조회
- `GET /api/health` - 헬스 체크

## 📝 라이선스

MIT
