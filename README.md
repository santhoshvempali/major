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

## Step 2: Configure Helm Chart values.yaml file 

### configure image name and image policy

![all text]()



