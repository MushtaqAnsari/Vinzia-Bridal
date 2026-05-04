import Image from "next/image"

function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

interface InstagramPost {
  id: string
  media_url: string
  permalink: string
  caption?: string
}

async function getInstagramPosts(): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  if (!token) return []
  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,media_type&limit=6&access_token=${token}`,
      { next: { revalidate: 21600 } } // cache 6 hours
    )
    if (!res.ok) return []
    const data = await res.json()
    return (data.data as InstagramPost[]).filter((p: InstagramPost & { media_type?: string }) => p.media_type !== "VIDEO")
  } catch {
    return []
  }
}

const PLACEHOLDER_POSTS = [
  "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1610047614256-023d7c028d0b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?auto=format&fit=crop&w=600&q=80",
]

function PlaceholderGrid() {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-1 md:gap-2">
      {PLACEHOLDER_POSTS.map((src, i) => (
        <a
          key={i}
          href="https://www.instagram.com/vinzia_bridal_studio/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative aspect-square overflow-hidden block bg-[#EDE8E1]"
        >
          <Image
            src={src}
            alt="Vinzia Bridal"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 33vw, 16vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">
              <InstagramIcon size={20} />
            </span>
          </div>
        </a>
      ))}
    </div>
  )
}

export async function InstagramFeed() {
  const posts = await getInstagramPosts()

  return (
    <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <a
          href="https://www.instagram.com/vinzia_bridal_studio/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-[#C9A96E] hover:text-[#A8864F] transition-colors"
        >
          <InstagramIcon size={14} />
          @vinzia_bridal_studio
        </a>
        <h2 className="font-[var(--font-cormorant)] text-4xl md:text-5xl text-[#1A1A1A] mt-2">
          As seen on Instagram
        </h2>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-3 md:grid-cols-6 gap-1 md:gap-2">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden block bg-[#EDE8E1]"
            >
              <Image
                src={post.media_url}
                alt={post.caption?.slice(0, 60) ?? "Vinzia Bridal"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 33vw, 16vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <InstagramIcon size={20} />
              </div>
            </a>
          ))}
        </div>
      ) : (
        <PlaceholderGrid />
      )}
    </section>
  )
}
