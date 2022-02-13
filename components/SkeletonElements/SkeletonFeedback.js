import { Card } from '@geist-ui/core';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Flex } from '../GlobalComponents';

export default function SkeletonFeedback() {
  return (
    <Flex css={{ flexDirection: 'column', gap: '1rem',lineHeight:'1' }}>
      <Skeleton height="80px" />
      <SkeletonButton />
      <Flex css={{flexDirection:'column',gap:'1rem'}}>
        <SkFeedbackCard/>
        <SkFeedbackCard/>
        <SkFeedbackCard/>
      </Flex>
    </Flex>
  );
}
const SkeletonButton = () => {
  return (
    <Skeleton
      width="150px"
      height="40px"
      count={2}
      inline
      style={{ marginRight: '1rem' }}
    />
  );
};
const SkFeedbackCard = () => {
  return (
    <Card width="100%">
      <Flex css={{ flexDirection: 'column',gap:'.7rem' }}>
        <Flex css={{gap:'.6rem'}}>
          <Skeleton circle width="2rem" height='2rem' />
          <Flex css={{flexDirection:'column',gap:'.3rem'}}>
            <Skeleton width="5em"/>
            <Skeleton width="3em"/>
          </Flex>
        </Flex>
        <Skeleton height="50px" />
      </Flex>
    </Card>
  );
};
