import Skeleton from 'react-loading-skeleton';
import { Card } from '@geist-ui/core';

import 'react-loading-skeleton/dist/skeleton.css';

import { Flex } from '../GlobalComponents';

const SkeletonRow = ({ width }) => (
  <tr>
    <td>
      <Skeleton inline={false} width={width} />
    </td>
    <td>
      <Skeleton inline={false} width={width} />
    </td>
    <td>
      <Skeleton inline={false} width={width} />
    </td>
    <td>
      <Skeleton inline={false} width={width} />
    </td>
  </tr>
);

export function SkeletonTable() {
  return (
    <>
      <style>
        {`
        td{
          padding:1rem;
        }
        `}
      </style>
      <table style={{ width: '100%', textAlign: 'center' }}>
        <thead>
          <tr>
            <th> </th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <SkeletonRow width={90} />
          <SkeletonRow width={90} />
          <SkeletonRow width={90} />
          <SkeletonRow width={90} />
          <SkeletonRow width={90} />
        </tbody>
      </table>
    </>
  );
}
export function SkeletonFeedback() {
  return (
    <Card>
      <Flex css={{ flexDirection: 'column', gap: '1rem', lineHeight: '1' }}>
        <Skeleton height="60px" />
        <SkeletonButton />
        <Flex css={{ flexDirection: 'column', gap: '1rem' }}>
          <SkFeedbackCard />
          <SkFeedbackCard />
          <SkFeedbackCard />
        </Flex>
      </Flex>
    </Card>
  );
}
const SkeletonButton = () => {
  return (
    <Skeleton
      width="150px"
      height="30px"
      count={2}
      inline
      style={{ marginRight: '1rem' }}
    />
  );
};
const SkFeedbackCard = () => {
  return (
    <Card width="100%">
      <Flex css={{ flexDirection: 'column', gap: '.7rem' }}>
        <Flex css={{ gap: '.6rem' }}>
          <Skeleton circle width="2rem" height="2rem" />
          <Flex css={{ flexDirection: 'column', gap: '.3rem' }}>
            <Skeleton width="5em" />
            <Skeleton width="3em" />
          </Flex>
        </Flex>
        <Skeleton height="50px" />
      </Flex>
    </Card>
  );
};
