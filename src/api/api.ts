/**
 * Backend API Client
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const LLM_API_KEY = process.env.NEXT_PUBLIC_LLM_API_KEY || '';

// Types (백엔드와 동일)
export interface CharacterMatch {
  character_id: string;
  character_name: string;
  character_tagline: string;
  character_background: string;
  reason: string;
  conversation_hint: string;
  profile_image: number;
}

export interface ChatMessage {
  role: 'user' | 'person';
  text: string;
}

// API Functions

/**
 * 고민에 맞는 캐릭터 매칭 (Claude AI 추천 + conversation_hint 생성)
 */
export async function matchCharacters(worryText: string): Promise<CharacterMatch[]> {
  const res = await fetch(`${API_BASE}/api/persons/match`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-LLM-API-Key': LLM_API_KEY,
    },
    body: JSON.stringify({ worryText }),
  });
  if (!res.ok) throw new Error('Failed to match characters');
  return res.json();
}

/**
 * 스트리밍 채팅
 */
export async function streamChat(
  characterId: string,
  userWorry: string,
  messages: ChatMessage[],
  onChunk: (text: string) => void,
  onDone: () => void,
  onError: (error: Error) => void
): Promise<void> {
  try {
    const res = await fetch(`${API_BASE}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-LLM-API-Key': LLM_API_KEY,
      },
      body: JSON.stringify({
        personId: characterId,
        userWorry,
        messages,
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to start chat stream');
    }

    const reader = res.body?.getReader();
    if (!reader) {
      throw new Error('No response body');
    }

    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') {
            onDone();
            return;
          }
          try {
            const parsed = JSON.parse(data);
            if (parsed.text) {
              onChunk(parsed.text);
            }
            if (parsed.error) {
              onError(new Error(parsed.error));
              return;
            }
          } catch {
            // Skip non-JSON lines
          }
        }
      }
    }

    onDone();
  } catch (error) {
    onError(error instanceof Error ? error : new Error('Unknown error'));
  }
}
