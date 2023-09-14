import adaptation from './adaptation';
import changeTheme from './changeTheme';

import type { AdaptationData } from './adaptation';

interface StyleProps {
  adaptation: () => AdaptationData | undefined,
  changeTheme: (style: string) => void
}

const data: StyleProps = { adaptation, changeTheme };

export default data;