// 화면 상태
export type Screen =
  | 'ONBOARDING_1'
  | 'ONBOARDING_2'
  | 'ONBOARDING_3'
  | 'INPUT'
  | 'LOADING'
  | 'CHARACTER_SELECT'
  | 'CHARACTER_DETAIL'
  | 'CHAT';

// 캐릭터 인터페이스 (백엔드 CharacterMatch와 동일)
export interface Character {
  character_id: string;
  character_name: string;
  character_tagline: string;
  character_background: string;
  reason: string;
  conversation_hint: string[];
  profile_image: string;
  tags: string[];
}

// 채팅 메시지 인터페이스
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// API용 채팅 메시지
export interface ApiChatMessage {
  role: 'user' | 'person';
  text: string;
}

// 앱 상태 인터페이스
export interface AppState {
  currentScreen: Screen;
  concern: string;
  selectedCharacter: Character | null;
  characters: Character[];
  messages: ChatMessage[];
  isLoading: boolean;
}
