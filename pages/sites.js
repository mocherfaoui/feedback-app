import { useForm } from 'react-hook-form';
import {
  Input,
  Modal,
  Spacer,
  Text,
  useModal,
  useToasts,
} from '@geist-ui/core';
import { ErrorMessage } from '@hookform/error-message';
import useSWR from 'swr';

import { useAuth } from '@/lib/auth';
import { createSite } from '@/lib/db';
import { withProtected } from '@/hooks/routes';

import DashboardShell from '@/components/Dashboard/DashboardShell';
import { SitesDashboard } from '@/components/Dashboard/DashboardTables';
import { SitesEmptyState } from '@/components/EmptyState';
import { FormError } from '@/components/GlobalComponents';
import Layout from '@/components/Layout';
import { SkeletonTable } from '@/components/SkeletonElements/SkeletonTable';

import { styled } from '@/stitches.config';
import fetcher from '@/utils/fetcher';

function Sites() {
  const { user } = useAuth();
  const { data, mutate } = useSWR(
    user ? ['/api/sites', user.token] : null,
    fetcher
  );
  const sites = data?.sites;
  const { setVisible, bindings } = useModal();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { setToast } = useToasts();

  const onCreateSite = async ({ name, url }) => {
    const newSite = {
      authorId: user.uid,
      createdAt: new Date().toISOString(),
      name,
      url,
    };
    await createSite(newSite);
    await mutate();
    setToast({
      text: 'The site was added successfully',
      type: 'success',
    });
    setVisible(false);
    reset({ name: '', url: '' });
  };
  return (
    <>
      <Layout>
        <DashboardShell pageName="Site" visible={() => setVisible(true)}>
          {!sites ? (
            <SkeletonTable />
          ) : sites?.length ? (
            <SitesDashboard sites={sites} />
          ) : (
            <SitesEmptyState visible={() => setVisible(true)} />
          )}
          <Form id="site_form" onSubmit={handleSubmit(onCreateSite)}>
            <Modal {...bindings}>
              <Modal.Title>Add Site</Modal.Title>
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => (
                  <FormError label="error" type="error" small filled>
                    {message}
                  </FormError>
                )}
              />
              <ErrorMessage
                errors={errors}
                name="url"
                render={({ message }) => (
                  <FormError label="error" type="error" small filled>
                    {message}
                  </FormError>
                )}
              />
              <Modal.Content>
                <Input
                  placeholder="My Site"
                  {...register('name', {
                    required: 'The name field is required',
                  })}
                >
                  <Text b font="1rem">
                    Name
                  </Text>
                </Input>
                <Spacer />
                <Input
                  placeholder="www.example.com"
                  {...register('url', {
                    required: 'The link field is required',
                    pattern: {
                      value:
                        /^[a-z]{1,10}[a-z-0-9][a-z0-9]{1,10}\.[a-z]{3,10}\.[a-z]{2,6}$/,
                      message:
                        'site url must match this pattern: www.example.com',
                    },
                  })}
                >
                  <Text b font="1rem">
                    Link
                  </Text>
                </Input>
              </Modal.Content>
              <Modal.Action
                passive
                onClick={() => setVisible(false)}
                font="1rem"
              >
                Cancel
              </Modal.Action>
              <Modal.Action form="site_form" font="1rem" htmlType="submit">
                Add
              </Modal.Action>
            </Modal>
          </Form>
        </DashboardShell>
      </Layout>
    </>
  );
}
const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
});
export default withProtected(Sites);
