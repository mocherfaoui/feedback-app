import Skeleton from 'react-loading-skeleton';
import { Card } from '@geist-ui/core';

import 'react-loading-skeleton/dist/skeleton.css';

import { Flex } from '../GlobalComponents';

export default function SkeletonFeedback() {
  return (
    <Flex css={{ flexDirection: 'column', gap: '1rem', lineHeight: '1' }}>
      <Skeleton height="50px" />
      <Flex css={{ flexDirection: 'column', gap: '1rem' }}>
        <SkFeedbackCard />
        <SkFeedbackCard />
        <SkFeedbackCard />
      </Flex>
    </Flex>
  );
}
const SkFeedbackCard = () => {
  return (
    <Flex css={{ alignItems: 'baseline', gap: '.5rem' }}>
      <Skeleton circle width="2rem" height="2rem" />
      <Card width="100%">
        <Flex css={{ flexDirection: 'column', gap: '.7rem' }}>
          <Flex css={{ gap: '.6rem' }}>
            <Flex css={{ flexDirection: 'column', gap: '.3rem' }}>
              <Skeleton width="7em" />
              <Skeleton width="4em" />
            </Flex>
          </Flex>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Flex>
      </Card>
    </Flex>
  );
};
