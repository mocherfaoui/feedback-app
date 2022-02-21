import Skeleton from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

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
