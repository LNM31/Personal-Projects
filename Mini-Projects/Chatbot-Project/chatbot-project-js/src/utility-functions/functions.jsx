import { useRef, useEffect } from 'react'

export function useAutoScroll(dependencies) 
{
  const containerRef = useRef(null);
  useEffect(() => 
  {
    const containerElem = containerRef.current;
    if(containerElem)
    {
      containerElem.scrollTop = containerElem.scrollHeight;
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);//array constrols when useEffect runs, or just dependencies

  return containerRef;
}