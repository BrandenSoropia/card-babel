# Web Scraping Notes

I'm thinking of scraping Flesh and Blood cards' Japanese translation data from https://libraryoffab.com/?p=180. I figured it'd be a fun thing to learn how to do since I've never done it before and it'd push me to learn some Python which I want to use in the future for a potential Visual Novel micro-project.

Thinking of using Scrapy since there's this nice tutorial from Digital Ocean (which also includes Python setup steps!) - https://www.digitalocean.com/community/tutorials/how-to-crawl-a-web-page-with-scrapy-and-python-3

## Sample HTML

I think I need to be familiar with the HTML's shape if I want to recognize, manipulate and store it. Here's some snippets I'll pull. They'll be categorized by card type in case there are differences, which there most-likely will since there are a variety of cards and ways to use them.

### Heroes

```html
<blockquote class="wp-block-quote">
  <p>Uzuri, Switchblade/Uzuri</p>
  <p>
    ターンに1回アタックリアクションーあなたの手札を1枚伏せて追放する:この方法で追放したカードを表向きにする。これがコスト2以下のアタックアクションカードなら、アクティブコンバットチェインのステルスを持つアタックアクションカードを対象としてそれをオーナーの山札の下へ置き、追放したカードをアクティブコンバットチェインに攻撃したプレイする。
  </p>
</blockquote>
```

### Weapons

There's already an annoying inconsistency between some weapons. Notice the nested `div` in "Spider's Bite":

```html
<blockquote class="wp-block-quote">
  <p>Spider’s Bite<br />Assassin Weapon – Dagger(1H) 1{P}</p>
  <div
    class="wp-block-group is-vertical is-layout-flex wp-container-core-group-layout-1 wp-block-group-is-layout-flex"
  >
    <p>ターンに1回アクションー{R}{R}:アタック Go Again</p>
    <p>Piercing1(これが装備品によりディフェンスされたならこれは+1{P})</p>
  </div>
  <p>
    これがヒーローにヒットしたとき、このターン次に1枚以上のアタックアクションカードでディフェンスされたとき、それらは-1{D}される。
  </p>
</blockquote>
```

...while there isn't one in "Nerve Scalpal" and other daggers!

```html
<blockquote class="wp-block-quote">
  <p>Nerve Scalpel<br />Assassin Weapon – Dagger(1H) 1{P}</p>
  <p>ターンに1回アクションー{R}{R}:アタック Go Again</p>
  <p>Piercing1(これが装備品によりディフェンスされたならこれは+1{P})</p>
  <p>
    これがヒーローにヒットしたとき、このターン次に1枚以上のリアクションアクションカードでディフェンされたとき、それらは-1{D}される。
  </p>
</blockquote>
```

### Armour

Seems similar to weapons.

```html
<blockquote class="wp-block-quote">
  <p>Redback Shroud<br />Assassin Equipment – Chest 1{D}</p>
  <p>
    これが墓地にある時、あなたのターン開始時にシルバーを2つ破壊してよい。そうしたならこれを着け直す。
  </p>
  <p>
    アタックリアクションーこれを破壊する:次のあなたが次にプレイするアタックリアクションカードは{R}減る
  </p>
  <p>
    Blade
    Break(コンバットチェインが閉じたときにこれでディフェンスしていたなら破壊する)
  </p>
</blockquote>
```

### Non-Attack Action Cards (Action Cards)

```html
<blockquote class="wp-block-quote">
  <p>Codex of Frailty<br />Assassin /Ranger Action<br />黄 0{R} -{P} 2{D}</p>
  <p>
    各プレイヤーは墓地からアタックアクションカードを裏向きでアーセナルに置く。そうしたプレイヤーは、手札を1枚捨てる。
  </p>
  <p>
    ”Ponder”トークンをあなたのコントロールで、”Frailty”トークンを対戦相手のコントロールで生み出す。
  </p>
  <p>Go Again</p>
</blockquote>
```

```html
<blockquote class="wp-block-quote">
  <p>Premeditate<br />Generic Action<br />赤 0{R} -{P} 2{D}</p>
  <p>
    次のアタックアクションカードがヒーローにヒットしたとき、”Ponder”トークンを生み出す。
  </p>
  <p>次にアーセナルからプレイされるアタックアクションカードは+3{P}。</p>
  <p>Go Again</p>
</blockquote>
```

### Attack Action Cards

Nice to Have: Bolded keywords to match, example "Stealth", "\* Specialization". Might be able to recognize keywords in text and write a tiny util to wrap it in `b`.

```html
<blockquote class="wp-block-quote">
  <p>Infiltrate<br />Assassin Action – Attack<br />赤 0{R} 3{P} 3{D}</p>
  <p>ステルス</p>
  <p>
    これがヒーローにヒットしたとき、そのヒーローのデッキの上のカードを1枚追放する。そのカードをあなたのエンド時までプレイしても良い。
  </p>
</blockquote>
```

```html
<blockquote class="wp-block-quote">
  <p>Shake Down<br />Assassin Action – Attack<br />赤 2{R} 6{P} 3{D}</p>
  <p>Uzuri Specialization(ヒーローがウズリでなければデッキに入れられない)</p>
  <p>
    このチェインリンクでアタックリアクションがプレイ/アクティブになったならこれは「これがヒーローにヒットしたとき、赤・黄・青のいずれかを選ぶ。そのヒーローは手札を公開し、選ばれた色のカードを追放する」を得る。
  </p>
</blockquote>
```

```html
<blockquote class="wp-block-quote">
  <p>
    Death Touch<br />Assassin /Ranger Action – Attack <br />(赤黄青) 1{R} 6{P}
    2{D}
  </p>
  <p>これは手札からプレイすることができない。</p>
  <p>
    これがヒーローにヒットしたとき、そのコントロールの下で”Frailty”、”Inertia”、”Bloodrot
    Pox ”トークンのいずれか1つを生み出す。
  </p>
</blockquote>
```

### Attack Reaction Cards

```html
<blockquote class="wp-block-quote">
  <p>
    Spike with Bloodrot<br />Assassin Attack Reaction<br />赤 1{R} -{P} 3{D}
  </p>
  <p>
    ステルスを持つ対象のアタックアクションカードの+3{P}と「これがヒーローにヒットしたとき、そのコントロールの元で”Bloodrot
    Pox”トークンを生み出す」を得る。
  </p>
</blockquote>
```

### Defense Reaction Cards

```html
<blockquote class="wp-block-quote">
  <p>
    Inertia Trap<br />Assassin /Ranger Defense Reaction – Trap<br />赤 0{R} -{P}
    3{D}
  </p>
  <p>
    元の{P}よりも大きいアタックをこれでディフェンスしたとき、攻撃しているヒーローのコントロールで”Inertia”トークンを生み出す。
  </p>
</blockquote>
```

### Instant

```html
<blockquote class="wp-block-quote">
  <p>Peace of Mind<br />Generic Instant<br />(赤黄青) 0{R} -{P} -{D}</p>
  <p>このターンの次に受けるダメージを4-2点軽減する。</p>
  <p>”Ponder”トークンを生み出す。</p>
</blockquote>
```

### Ideas of How Text Should Look

```markdown
en-US
<strong>Uzuri Specialization<strong><i>(You may only have this in your deck if your hero is Uzuri)</i><br>If you've played or activated an attack reaction this chain link, Shake Down has "When this hits a hero, choose red, yellow, or blue. They reveal their hand. Banish a card of the chosen color."

---

jp-JA
<strong>Uzuri Specialization</strong><i>(ヒーローがウズリでなければデッキに入れられない)</i><br>このチェインリンクでアタックリアクションがプレイ/アクティブになったならこれは「これがヒーローにヒットしたとき、赤・黄・青のいずれかを選ぶ。そのヒーローは手札を公開し、選ばれた色のカードを追放する」を得る。
```

```markdown
en-US

Each hero puts an attack action card from their graveyard face down into their arsenal. Each hero that does, discards a card.<br>Create a Ponder token under your control and a Frailty token under each opponent's control.<br><strong>Go again</strong>

---

jp-JA

各プレイヤーは墓地からアタックアクションカードを裏向きでアーセナルに置く。そうしたプレイヤーは、手札を 1 枚捨てる。<br>”Ponder”トークンをあなたのコントロールで、”Frailty”トークンを対戦相手のコントロールで生み出す。
<br><strong>Go Again</strong>
```
