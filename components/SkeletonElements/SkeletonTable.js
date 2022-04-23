import Skeleton from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonRow = ({ width }) => (
  <tr>
    {[...Array(4)].map((i) => (
      <td key={i}>
        <Skeleton inline={false} width={width} />
      </td>
    ))}
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
          {[...Array(5)].map((i) => (
            <SkeletonRow key={i} width={90} />
          ))}
        </tbody>
      </table>
    </>
  );
}
