# STEPS TO CREATE HELM CHART

## STEP 1: create new helm chart

helm create "chartname"

```bash
# demogarage is chart name
helm create demogarage

```


```bash
#to see the chart structure
ls demogarage
```
![alt text](https://github.com/santhoshvempali/major/blob/main/Screenshot%20from%202022-06-15%2011-19-27.png)

- Directory charts – Used for adding dependent charts. Empty by default.
- Directory templates – All kubernetees Configuration files that deploy in the cluster.
- Chart file – Outline of the Helm chart structure.
- values file – Formatting information for configuring the chart

```bash
#to see kubernetees objets yamls in templates
ls demogarage/templates
```
### These are deafulat kubernetees yamls in templates
![all text](https://github.com/santhoshvempali/major/blob/main/templates.png)

we can create other kuberntees resource yamls as per our application needs



## Step 2: Configure Helm Chart values.yaml file 

### configure image name and image policy

![all text](https://github.com/santhoshvempali/major/blob/main/deployValues.png)

### There are three possible values for the pullPolicy:
- IfNotPresent – Downloads a new version of the image if one does not exist in the cluster.
- Always – Pulls the image on every restart or deployment.
- Latest – Pulls the most up-to-date version available.

## Step 3: Change Networking Service Type
To change the networking service type, locate the service value and change service type and port values
The avaliable service types are
- ClusterIp
- NodePort
- Loadbalancer

![all text](https://github.com/santhoshvempali/major/blob/main/svcValues.png)

## Step 4 :Install the Helm Chart

helm install "full name override" "chart name"/ --values "chart name"/values.yaml
```bash
  helm install demogarage-chart demogarage/ --values demogarage/values.yaml
```

![all text](https://github.com/santhoshvempali/major/blob/main/helmdeployed.png)










