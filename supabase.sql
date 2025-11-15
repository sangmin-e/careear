-- Schema for minimal jobs table and FTS index
create extension if not exists pg_trgm;
create extension if not exists unaccent;

create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  description text,
  salary_min int,
  salary_max int,
  outlook text,
  created_at timestamptz default now()
);

-- Optional: simple indexes
create index if not exists idx_jobs_category on jobs(category);

-- Basic FTS index (if using text search configurations for Korean, adjust as needed)
-- Note: Supabase Postgres may not include 'korean' config by default.
-- You can still rely on ILIKE queries used in API for MVP.

-- Sample seed data
insert into jobs (name, category, description, salary_min, salary_max, outlook) values
('AI 전문가', 'IT', '인공지능 모델을 개발하고 학습시키는 업무', 5000, 8000, '밝음'),
('데이터 분석가', 'IT', '빅데이터를 분석하여 비즈니스 인사이트 제공', 4500, 7000, '밝음'),
('웹 개발자', 'IT', '웹사이트 및 웹앱 개발', 4000, 6500, '밝음'),
('의료 기술자', '의료', '의료 장비 운영 및 기술 지원', 3500, 5500, '보통'),
('간호사', '의료', '환자 진료 및 의료 서비스 제공', 3000, 5000, '밝음'),
('목공 기술자', '제조', '나무로 가구 및 제품 제작', 3000, 4500, '보통'),
('자동차 정비사', '제조', '자동차 정비 및 유지보수', 3000, 4800, '보통'),
('교사', '교육', '학생 교육 및 지도', 3500, 5500, '보통'),
('프로그래머', 'IT', '소프트웨어 개발 및 유지보수', 4500, 7500, '밝음'),
('로봇공학자', '공학', '로봇 설계 및 개발', 5000, 8500, '매우밝음');
