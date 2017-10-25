import { module } from 'angular';

import { CORE_MODULE } from '@spinnaker/core';
import { AMAZON_MODULE } from '@spinnaker/amazon';
import { GOOGLE_MODULE } from '@spinnaker/google';
import { KUBERNETES_V1_MODULE, KUBERNETES_V2_MODULE } from '@spinnaker/kubernetes';
import { ACME_MODULE } from './acme/acme.module';

module('acme.spinnaker', [
  CORE_MODULE,
  AMAZON_MODULE,
  GOOGLE_MODULE,
  KUBERNETES_V1_MODULE,
  KUBERNETES_V2_MODULE,
  ACME_MODULE,
]);
