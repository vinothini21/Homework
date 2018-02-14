

```python
# Import dependencies
import pandas as pd
import os
```


```python
# Save file path to variable
json_path = os.path.join('purchase_data.json')

```


```python
# Read with Pandas
heroesofpymoli_df = pd.read_json(json_path)
```


```python
heroesofpymoli_df.columns
```




    Index(['Age', 'Gender', 'Item ID', 'Item Name', 'Price', 'SN'], dtype='object')




```python
# Create the GroupBy object based on the "SN" column
heroesofpymoli_df["SN"].nunique()

```




    573




```python
unique_items = heroesofpymoli_df["Item Name"].nunique()
average_price = heroesofpymoli_df["Price"].mean()
total_number_purchase = heroesofpymoli_df["Price"].count()
total_revenue = heroesofpymoli_df["Price"].sum()
#print(unique_items, average_price,total_number_purchase, total_revenue)

```


```python
total_purchasing_total_df = pd.DataFrame({"Unique Items" : [unique_items],
                                          "Average price" : [average_price],
                                          "Total Number of Purchases" : [total_number_purchase],
                                          "Total Revenue" : [total_revenue]
                                         })
total_purchasing_total2_df = total_purchasing_total_df[["Unique Items","Average price", 
                                            "Total Number of Purchases","Total Revenue"]]

total_purchasing_total2_df
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Unique Items</th>
      <th>Average price</th>
      <th>Total Number of Purchases</th>
      <th>Total Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>179</td>
      <td>2.931192</td>
      <td>780</td>
      <td>2286.33</td>
    </tr>
  </tbody>
</table>
</div>




```python
total_gender = heroesofpymoli_df["Gender"].count()
male = heroesofpymoli_df["Gender"].value_counts()['Male']
female = heroesofpymoli_df["Gender"].value_counts()['Female']
non_gender_specific = total_gender - male - female
#print(total_gender, male, female, non_gender_specific)
```


```python
# Calculate percentage of respondents belonging to each gender
male_percent = (male/total_gender) * 100
female_percent = (female/total_gender) * 100
non_gender_specific_percent = (non_gender_specific/total_gender) * 100
#print(f" % Male: {male_percent}\n % Female: {female_percent}\n % non_specifc: {non_gender_specific}")
```


```python
gender_demo_df = pd.DataFrame({"Total Count": [male, female, non_gender_specific], 
                               "Percentage of Players": [male_percent, female_percent, non_gender_specific_percent] 
                               }, index=["Male", "Female", "Other/Non-Disclosed"])
gender_demo_df
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Percentage of Players</th>
      <th>Total Count</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Male</th>
      <td>81.153846</td>
      <td>633</td>
    </tr>
    <tr>
      <th>Female</th>
      <td>17.435897</td>
      <td>136</td>
    </tr>
    <tr>
      <th>Other/Non-Disclosed</th>
      <td>1.410256</td>
      <td>11</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Grouping the DataFrame by "Gender"
gender_group = heroesofpymoli_df.groupby("Gender")
#gender_group.head(5)
```


```python
# Purchase count by gender
purchase_count_male = gender_group["Gender"].count()['Male']
purchase_count_female = gender_group["Gender"].count()['Female']
purchase_count_other = gender_group["Gender"].count()['Other / Non-Disclosed']

# Total purchase value by gender
total_purchase_value_male = gender_group["Price"].sum()['Male']
total_purchase_value_female = gender_group["Price"].sum()['Female']
total_purchase_value_other = gender_group["Price"].sum()['Other / Non-Disclosed']

# Avergae purchase price by gender
average_purchase_price_male = gender_group["Price"].mean()['Male']
average_purchase_price_female = gender_group["Price"].mean()['Female']
average_purchase_price_other = gender_group["Price"].mean()['Other / Non-Disclosed']

# Normalized totals by gender
normalized_total_gender = (gender_group["Price"].sum()/gender_group["Gender"].count())
normalized_total_gender.head()
```




    Gender
    Female                   2.815515
    Male                     2.950521
    Other / Non-Disclosed    3.249091
    dtype: float64




```python
gender_purchase_analysis_df = pd.DataFrame({"Purchase Count": [purchase_count_male, purchase_count_female,
                                                                 purchase_count_other], 
                               "Average Purchase Price": [average_purchase_price_male, 
                                                          average_purchase_price_female, average_purchase_price_other],
                                "Total Purchase Value": [total_purchase_value_male, total_purchase_value_female,
                                                        total_purchase_value_other],
                                
                               }, index=["Male", "Female", "Other/Non-Disclosed"])   
gender_purchase_analysis_df
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Average Purchase Price</th>
      <th>Purchase Count</th>
      <th>Total Purchase Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Male</th>
      <td>2.950521</td>
      <td>633</td>
      <td>1867.68</td>
    </tr>
    <tr>
      <th>Female</th>
      <td>2.815515</td>
      <td>136</td>
      <td>382.91</td>
    </tr>
    <tr>
      <th>Other/Non-Disclosed</th>
      <td>3.249091</td>
      <td>11</td>
      <td>35.74</td>
    </tr>
  </tbody>
</table>
</div>




```python
# create the bins to store data
bins = [0, 10, 15, 20, 25, 30, 35, 40, 120]
bin_names = ['<10', '10-14', '15-19', '20-24', '25-29', '30-34', '35-39', '40+']
bin_df = heroesofpymoli_df.copy()
age_demo_count = pd.cut(heroesofpymoli_df["Age"], bins, labels=bin_names).value_counts()
age_demo_percent = (age_demo/total_gender)*100
percent_players_df = pd.DataFrame({"Percentage of Players": age_demo_percent, "Total Count":age_demo_count})
percent_players_df
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Percentage of Players</th>
      <th>Total Count</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>20-24</th>
      <td>39.102564</td>
      <td>305</td>
    </tr>
    <tr>
      <th>15-19</th>
      <td>23.589744</td>
      <td>184</td>
    </tr>
    <tr>
      <th>10-14</th>
      <td>10.000000</td>
      <td>78</td>
    </tr>
    <tr>
      <th>25-29</th>
      <td>9.743590</td>
      <td>76</td>
    </tr>
    <tr>
      <th>30-34</th>
      <td>7.435897</td>
      <td>58</td>
    </tr>
    <tr>
      <th>35-39</th>
      <td>5.641026</td>
      <td>44</td>
    </tr>
    <tr>
      <th>&lt;10</th>
      <td>4.102564</td>
      <td>32</td>
    </tr>
    <tr>
      <th>40+</th>
      <td>0.384615</td>
      <td>3</td>
    </tr>
  </tbody>
</table>
</div>




```python
bin_df["Age Groups"] = pd.cut(heroesofpymoli_df["Age"], bins, labels =bin_names)
bin_cut = pd.cut(bin_df["Age"], bins, labels = bin_names)
age_grouped_bin_df = bin_df.groupby(["Age Groups"])
purchase_count_age = age_grouped_bin_df["Age"].count()
avg_price_age = age_grouped_bin_df["Price"].mean()
total_purchase_age = age_grouped_bin_df["Price"].sum()
dupdrop = heroesofpymoli_df.drop_duplicates(subset = 'SN', keep = "first")
dupdrop["Age Groups"] = pd.cut(dupdrop["Age"], bins, labels = bin_names)
dupdrop = dupdrop.groupby(["Age Groups"])
normalized_total_bin_df = (age_grouped_bin_df["Price"].sum()/dupdrop["SN"].count())

```

    /Users/vinu/anaconda3/envs/pythonData/lib/python3.6/site-packages/ipykernel/__main__.py:8: SettingWithCopyWarning: 
    A value is trying to be set on a copy of a slice from a DataFrame.
    Try using .loc[row_indexer,col_indexer] = value instead
    
    See the caveats in the documentation: http://pandas.pydata.org/pandas-docs/stable/indexing.html#indexing-view-versus-copy



```python
age_demo_bin_df = pd.DataFrame({ "Purchase Count": purchase_count_age,
                           "Average Purchase Price": avg_price_age,
                           "Total Purchase Value": total_purchase_age,
                           "Normalized Total": normalized_total_bin_df})

age_demo_bin_df
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Average Purchase Price</th>
      <th>Normalized Total</th>
      <th>Purchase Count</th>
      <th>Total Purchase Value</th>
    </tr>
    <tr>
      <th>Age Groups</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>&lt;10</th>
      <td>3.019375</td>
      <td>4.391818</td>
      <td>32</td>
      <td>96.62</td>
    </tr>
    <tr>
      <th>10-14</th>
      <td>2.873718</td>
      <td>4.150926</td>
      <td>78</td>
      <td>224.15</td>
    </tr>
    <tr>
      <th>15-19</th>
      <td>2.873587</td>
      <td>3.803885</td>
      <td>184</td>
      <td>528.74</td>
    </tr>
    <tr>
      <th>20-24</th>
      <td>2.959377</td>
      <td>3.857308</td>
      <td>305</td>
      <td>902.61</td>
    </tr>
    <tr>
      <th>25-29</th>
      <td>2.892368</td>
      <td>4.227308</td>
      <td>76</td>
      <td>219.82</td>
    </tr>
    <tr>
      <th>30-34</th>
      <td>3.073448</td>
      <td>4.051364</td>
      <td>58</td>
      <td>178.26</td>
    </tr>
    <tr>
      <th>35-39</th>
      <td>2.897500</td>
      <td>5.099600</td>
      <td>44</td>
      <td>127.49</td>
    </tr>
    <tr>
      <th>40+</th>
      <td>2.880000</td>
      <td>2.880000</td>
      <td>3</td>
      <td>8.64</td>
    </tr>
  </tbody>
</table>
</div>




```python

top_5_spenders_df= heroesofpymoli_df.groupby('SN').sum().reset_index().sort_values(['Price'], 
                    ascending=False).groupby('SN').head(5).reset_index(drop=True).drop(['Age', 'Item ID'], axis=1)

top_5_spenders_df1= heroesofpymoli_df.groupby('SN').count().reset_index().sort_values(['Price'], 
                    ascending=False).groupby('SN').head(5).reset_index(drop=True).drop(['Age','Item ID','Gender','Price'], 
                                                                                       axis=1)
merge_table = pd.merge(top_5_spenders_df, top_5_spenders_df1,on="SN")
merge_table1=merge_table.rename(columns = {'Item Name':'Purchase Count'})
top_5_mean_df = pd.DataFrame({"Average Price" :top_5_spenders_df['Price']/top_5_spenders_df1['Item Name']})

```


```python
merge_table = pd.merge(top_5_spenders_df, top_5_spenders_df1,on="SN")
merge_table1_df=merge_table.rename(columns = {'Item Name':'Purchase Count'})

```


```python
top_spenders = pd.merge(merge_table1_df, top_5_mean_df, left_index=True, right_index=True)
merge_table1_df=merge_table.rename(columns = {'Item Name':'Purchase Count', 'Price':'Total Purchase Value'})
top_spenders.head(5)

```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>SN</th>
      <th>Total Purchase Value</th>
      <th>Purchase Count</th>
      <th>Average Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Undirrala66</td>
      <td>17.06</td>
      <td>5</td>
      <td>3.4120</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Saedue76</td>
      <td>13.56</td>
      <td>4</td>
      <td>3.3900</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Mindimnya67</td>
      <td>12.74</td>
      <td>4</td>
      <td>3.1850</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Haellysu29</td>
      <td>12.73</td>
      <td>3</td>
      <td>3.1825</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Eoda93</td>
      <td>11.58</td>
      <td>3</td>
      <td>2.8950</td>
    </tr>
  </tbody>
</table>
</div>




```python
#Most Popular Items
top_5_items_df= heroesofpymoli_df.groupby(['Item Name']).count().reset_index().sort_values(['Price'], 
                    ascending=False).groupby('Item Name').head(5).reset_index(drop=True).drop(['Age','Item ID','Gender','Price'], axis=1)
top_5_items_rename_df = top_5_items_df.rename(columns={'SN':'Purchase Count'})


```


```python
 
x_df = heroesofpymoli_df.loc[heroesofpymoli_df['Item Name'].isin(['Final Critic','Arcane Gem','Betrayal, Whisper of Grieving Widows','Stormcaller', 'Woeful Adamantite Claymore'])]
xy_df = x_df.drop_duplicates(subset = ['Item Name', 'Item ID'], keep='first')

```


```python
merge_table_popular_item = pd.merge(top_5_items_rename_df, xy_df,on="Item Name")
Final_popular_item_df = merge_table_popular_item.drop(columns=['Age', 'Gender', 'SN'])

```


```python
top_5_itemsx_df= heroesofpymoli_df.groupby(['Item Name']).sum().reset_index().sort_values(['Price'], 
                    ascending=False).groupby('Item Name').head(5).reset_index(drop=True).drop(['Age','Item ID'], axis=1)
y_df = top_5_itemsx_df.loc[top_5_itemsx_df['Item Name'].isin(['Final Critic','Arcane Gem','Betrayal, Whisper of Grieving Widows','Stormcaller', 'Woeful Adamantite Claymore'])]
y1_df = y_df.rename(columns={'Price': 'Total Purchase Value'}).reset_index(drop=True)

```


```python
merge_table_popular_item_final = pd.merge(Final_popular_item_df, y1_df,on="Item Name")
merge_table_popular_item_final
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Item Name</th>
      <th>Purchase Count</th>
      <th>Item ID</th>
      <th>Price</th>
      <th>Total Purchase Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Final Critic</td>
      <td>14</td>
      <td>92</td>
      <td>1.36</td>
      <td>38.60</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Final Critic</td>
      <td>14</td>
      <td>101</td>
      <td>4.62</td>
      <td>38.60</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Arcane Gem</td>
      <td>11</td>
      <td>84</td>
      <td>2.23</td>
      <td>24.53</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Betrayal, Whisper of Grieving Widows</td>
      <td>11</td>
      <td>39</td>
      <td>2.35</td>
      <td>25.85</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Stormcaller</td>
      <td>10</td>
      <td>30</td>
      <td>4.15</td>
      <td>34.65</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Stormcaller</td>
      <td>10</td>
      <td>180</td>
      <td>2.78</td>
      <td>34.65</td>
    </tr>
    <tr>
      <th>6</th>
      <td>Woeful Adamantite Claymore</td>
      <td>9</td>
      <td>175</td>
      <td>1.24</td>
      <td>11.16</td>
    </tr>
  </tbody>
</table>
</div>




```python
profitable_items_df= heroesofpymoli_df.groupby(['Item Name']).sum().reset_index().sort_values(['Price'], 
                    ascending=False).groupby('Item Name').head(5).reset_index(drop=True).drop(['Age','Item ID'], axis=1)
profitable_items_rename_df = profitable_items_df.rename(columns={'Price': 'Total Purchase Value'}).reset_index(drop=True)
#profitable_items_count_df.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Item Name</th>
      <th>Gender</th>
      <th>Price</th>
      <th>SN</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Final Critic</td>
      <td>14</td>
      <td>14</td>
      <td>14</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Arcane Gem</td>
      <td>11</td>
      <td>11</td>
      <td>11</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Betrayal, Whisper of Grieving Widows</td>
      <td>11</td>
      <td>11</td>
      <td>11</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Stormcaller</td>
      <td>10</td>
      <td>10</td>
      <td>10</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Woeful Adamantite Claymore</td>
      <td>9</td>
      <td>9</td>
      <td>9</td>
    </tr>
  </tbody>
</table>
</div>




```python
profitable_items1_df = heroesofpymoli_df.loc[heroesofpymoli_df['Item Name'].isin
                                             (['Final Critic','Retribution Axe','Stormcaller','Spectral Diamond Doomblade','Orenmir'])]
dup_drop_df = profitable_items1_df.drop_duplicates(subset = ['Item Name', 'Item ID'], keep='first')
#dup_drop_df
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Age</th>
      <th>Gender</th>
      <th>Item ID</th>
      <th>Item Name</th>
      <th>Price</th>
      <th>SN</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>3</th>
      <td>21</td>
      <td>Male</td>
      <td>92</td>
      <td>Final Critic</td>
      <td>1.36</td>
      <td>Pheusrical25</td>
    </tr>
    <tr>
      <th>50</th>
      <td>32</td>
      <td>Female</td>
      <td>32</td>
      <td>Orenmir</td>
      <td>4.95</td>
      <td>Saistyphos30</td>
    </tr>
    <tr>
      <th>54</th>
      <td>25</td>
      <td>Female</td>
      <td>101</td>
      <td>Final Critic</td>
      <td>4.62</td>
      <td>Minduli80</td>
    </tr>
    <tr>
      <th>57</th>
      <td>24</td>
      <td>Male</td>
      <td>34</td>
      <td>Retribution Axe</td>
      <td>4.14</td>
      <td>Alallo58</td>
    </tr>
    <tr>
      <th>101</th>
      <td>25</td>
      <td>Male</td>
      <td>30</td>
      <td>Stormcaller</td>
      <td>4.15</td>
      <td>Assistasda90</td>
    </tr>
    <tr>
      <th>107</th>
      <td>29</td>
      <td>Male</td>
      <td>115</td>
      <td>Spectral Diamond Doomblade</td>
      <td>4.25</td>
      <td>Undirrala66</td>
    </tr>
    <tr>
      <th>119</th>
      <td>19</td>
      <td>Male</td>
      <td>180</td>
      <td>Stormcaller</td>
      <td>2.78</td>
      <td>Yasur35</td>
    </tr>
  </tbody>
</table>
</div>




```python
v_df = top_5_items_df.loc[top_5_items_df['Item Name'].isin
                                             (['Final Critic','Retribution Axe','Stormcaller','Spectral Diamond Doomblade','Orenmir'])]
v1_df = v_df.rename(columns={'SN': 'Purchase Count'})

```


```python
merge_table_profitable_item_final = pd.merge(dup_drop_df, profitable_items_rename_df, on="Item Name")
Final_profitable_item = merge_table_profitable_item_final.drop(columns={'Age', 'Gender', 'SN'})
g_df = pd.merge(Final_profitable_item ,v1_df, on="Item Name")
g_df
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Item ID</th>
      <th>Item Name</th>
      <th>Price</th>
      <th>Total Purchase Value</th>
      <th>Purchase Count</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>92</td>
      <td>Final Critic</td>
      <td>1.36</td>
      <td>38.60</td>
      <td>14</td>
    </tr>
    <tr>
      <th>1</th>
      <td>101</td>
      <td>Final Critic</td>
      <td>4.62</td>
      <td>38.60</td>
      <td>14</td>
    </tr>
    <tr>
      <th>2</th>
      <td>32</td>
      <td>Orenmir</td>
      <td>4.95</td>
      <td>29.70</td>
      <td>6</td>
    </tr>
    <tr>
      <th>3</th>
      <td>34</td>
      <td>Retribution Axe</td>
      <td>4.14</td>
      <td>37.26</td>
      <td>9</td>
    </tr>
    <tr>
      <th>4</th>
      <td>30</td>
      <td>Stormcaller</td>
      <td>4.15</td>
      <td>34.65</td>
      <td>10</td>
    </tr>
    <tr>
      <th>5</th>
      <td>180</td>
      <td>Stormcaller</td>
      <td>2.78</td>
      <td>34.65</td>
      <td>10</td>
    </tr>
    <tr>
      <th>6</th>
      <td>115</td>
      <td>Spectral Diamond Doomblade</td>
      <td>4.25</td>
      <td>29.75</td>
      <td>7</td>
    </tr>
  </tbody>
</table>
</div>


