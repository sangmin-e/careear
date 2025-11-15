"use client"
import { useState } from 'react'

type Job = {
  id: string
  name: string
  category: string
  description: string | null
  salary_min: number | null
  salary_max: number | null
  outlook: string | null
}

export default function JobSearch() {
  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState<Job[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const categories = ['IT', '의료', '교육', '제조', '공학', '금융', '미디어']
  const [activeCat, setActiveCat] = useState<string | null>(null)

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/jobs/search?keyword=${encodeURIComponent(keyword)}`)
      const data = await res.json()
      setResults(data)
      setActiveCat(null)
    } catch (err: any) {
      setError(err?.message ?? '검색 중 오류가 발생했습니다')
    } finally {
      setLoading(false)
    }
  }

  async function handleCategoryClick(cat: string) {
    setLoading(true)
    setError(null)
    setActiveCat(cat)
    try {
      const res = await fetch(`/api/jobs/category/${encodeURIComponent(cat)}`)
      const data = await res.json()
      setResults(data)
    } catch (err: any) {
      setError(err?.message ?? '검색 중 오류가 발생했습니다')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>진로 검색 프로토타입</h1>
      <form onSubmit={handleSearch} style={{ margin: '16px 0', display: 'flex', gap: 8 }}>
        <input
          type="text"
          placeholder="관심 있는 직업 또는 활동 입력..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ padding: 10, flex: 1, border: '1px solid #ccc', borderRadius: 6 }}
        />
        <button type="submit" style={{ padding: '10px 16px', borderRadius: 6, border: '1px solid #444' }}>
          검색
        </button>
      </form>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            style={{
              padding: '6px 10px',
              borderRadius: 16,
              border: activeCat === cat ? '1px solid #111' : '1px solid #ccc',
              background: activeCat === cat ? '#f0f0f0' : '#fff',
              cursor: 'pointer'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && <p>검색 중...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {results.map((job) => (
          <div key={job.id} style={{ border: '1px solid #ddd', padding: 12, margin: '10px 0', borderRadius: 8 }}>
            <h3 style={{ marginBottom: 4 }}>{job.name}</h3>
            <p><strong>카테고리:</strong> {job.category}</p>
            {(job.salary_min || job.salary_max) && (
              <p><strong>연봉:</strong> {job.salary_min ?? '-'}만 ~ {job.salary_max ?? '-'}만</p>
            )}
            {job.outlook && <p><strong>전망:</strong> {job.outlook}</p>}
            {job.description && (
              <p><strong>설명:</strong> {job.description.length > 120 ? job.description.slice(0, 120) + '...' : job.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
