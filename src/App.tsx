import type { FC } from 'react'
// 导入模块化的 CSS 样式
import styles from '@/App.module.less'

const App: FC = () => {
  return (
    // 绑定模块化的 CSS 样式
    <div className={styles.container}>
      <h1 className={styles.title}>App Component</h1>
    </div>
  )
}

export default App
