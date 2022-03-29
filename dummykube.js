const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

async function kube(namespace){
    let pods=await k8sApi.listPodForAllNamespaces();
    console.log(pods.body.V1PodList);

}

kube("default");