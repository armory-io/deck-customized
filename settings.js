'use strict';

var feedbackUrl = process.env.FEEDBACK_URL;
var gateHost = process.env.API_HOST || 'http://localhost:8084';
var bakeryDetailUrl = process.env.BAKERY_DETAIL_URL || (gateHost + '/bakery/logs/{{context.region}}/{{context.status.resourceId}}');
var authEndpoint = process.env.AUTH_ENDPOINT || (gateHost + '/auth/user');
var fiatEnabled = process.env.FIAT_ENABLED === 'true' ? true : false;
var entityTagsEnabled = process.env.ENTITY_TAGS_ENABLED === 'true' ? true : false;
var liveCallsEnabled = process.env.LIVE_CALLS === 'true';
var defaultMetricStore = process.env.METRIC_STORE || 'atlas';

window.spinnakerSettings = {
  checkForUpdates: true,
  defaultProviders: ['aws', 'gce', 'kubernetes'],
  feedbackUrl: feedbackUrl,
  gateUrl: gateHost,
  bakeryDetailUrl: bakeryDetailUrl,
  authEndpoint: authEndpoint,
  pollSchedule: 30000,
  defaultTimeZone: process.env.TIMEZONE || 'America/Los_Angeles', // see http://momentjs.com/timezone/docs/#/data-utilities/
  defaultCategory: 'serverGroup',
  defaultInstancePort: 80,
  providers: {
    aws: {
      defaults: {
        account: 'test',
        region: 'us-east-1',
        iamRole: 'BaseIAMRole',
      },
      defaultSecurityGroups: [],
      loadBalancers: {
        // if true, VPC load balancers will be created as internal load balancers if the selected subnet has a purpose
        // tag that starts with "internal"
        inferInternalFlagFromSubnet: false,
      },
      useAmiBlockDeviceMappings: false,
    },
    gce: {
      defaults: {
        account: 'my-google-account',
        region: 'us-central1',
        zone: 'us-central1-f',
      },
      associatePublicIpAddress: true,
    },
      kubernetes: {
      defaults: {
        account: 'my-kubernetes-account',
        namespace: 'default',
        proxy: 'localhost:8001',
        internalDNSNameTemplate: '{{name}}.{{namespace}}.svc.cluster.local',
        instanceLinkTemplate: '{{host}}/api/v1/proxy/namespaces/{{namespace}}/pods/{{name}}',
      },
    },
  },
  whatsNew: {
    gistId: '32526cd608db3d811b38',
    fileName: 'news.md',
  },
  notifications: {
    email: {
      enabled: true,
    },
    sms: {
      enabled: true,
    },
    slack: {
      enabled: true,
      botName: 'spinnakerbot'
    }
  },
  authEnabled: true,
  authTtl: 600000,
  gitSources: ['stash', 'github', 'bitbucket'],
  triggerTypes: ['git', 'pipeline', 'docker', 'cron', 'jenkins', 'travis'],
  canary: {
    liveCalls: liveCallsEnabled,
    metricsAccountName: 'my-google-account',
    storageAccountName: 'my-google-account',
    judge: 'dredd-v1.0',
    metricStore: defaultMetricStore,
  },
  feature: {
    entityTags: entityTagsEnabled,
    fiatEnabled: fiatEnabled,
    pipelines: true,
    notifications: false,
    fastProperty: true,
    vpcMigrator: true,
    clusterDiff: false,
    roscoMode: false,
    chaosMonkey: true,
    // whether stages affecting infrastructure (like "Create Load Balancer") should be enabled or not
    infrastructureStages: process.env.INFRA_STAGES === 'enabled',
    jobs: false,
    snapshots: false,
    travis: false,
  },
};
