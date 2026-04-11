// 화면 상태 - SPLASH 제거, ONBOARDING으로 시작
export type Screen =
  | 'ONBOARDING_1'
  | 'ONBOARDING_2'
  | 'ONBOARDING_3'
  | 'INPUT'
  | 'LOADING'
  | 'CHARACTER_SELECT'
  | 'CHARACTER_DETAIL'
  | 'CHAT';

// 캐릭터 타입
export type CharacterType = '역사적 인물' | '비슷한 경험자' | '유명인' | '정치인';

// 캐릭터 인터페이스
export interface Character {
  id: string;
  name: string;
  type: CharacterType;
  profileImage: string;
  shortDescription: string;
  fullDescription: string;
  wantToTalk: string;
  lifeStory: string;
}

// 채팅 메시지 인터페이스
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
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

// 칩 인터페이스
export interface Chip {
  id: string;
  label: string;
  isActive?: boolean;
}
