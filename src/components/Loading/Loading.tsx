import { FC } from 'react';
import { LoadingStyle } from './Loading.style';

/**
 * Анимированная надпись загрузки
 */
export const LoadAnimation: FC<{language: 'rus' | 'eng', className: string}> = 
({ ...props }) => 
{
  const loading_text = 
  {
    rus: 'Загрузка...',
    eng: 'Loading...'
  };

  const styles = LoadingStyle();

  return(
    <div className={styles.container + ' ' + props.className}>
      <span>{loading_text[props.language]}</span>
    </div>
  );
};