# Phase 1 Backup/Restore + Rollback Drill Evidence — 2026-05-19

This records dated evidence for Gate 2 in `HANDOFF-GO-NO-GO-CHECKLIST.md`.

## Drill scope

- Scope: `infra/` configuration artifacts and compose reproducibility checks.
- Goal: verify backup archive creation, restore extraction, and rollback simulation validity.
- Notes: this drill validates infrastructure config recovery mechanics (not full live service state recovery inside running containers).

## Commands executed

```bash
cd /home/runner/work/manage.scrypted.app/manage.scrypted.app/infra
docker compose config >/tmp/phase1-drill/compose-config.before.txt

cd /home/runner/work/manage.scrypted.app/manage.scrypted.app
tar -czf /tmp/phase1-drill/infra-config-backup-2026-05-19.tgz \
  infra/Caddyfile \
  infra/Caddyfile.lan \
  infra/Caddyfile.advanced \
  infra/docker-compose.yml \
  infra/README.md

sha256sum /tmp/phase1-drill/infra-config-backup-2026-05-19.tgz \
  > /tmp/phase1-drill/backup.sha256

tar -xzf /tmp/phase1-drill/infra-config-backup-2026-05-19.tgz \
  -C /tmp/phase1-drill/restore-target

cd /tmp/phase1-drill/rollback-sim/infra
docker compose config >/tmp/phase1-drill/compose-config.after.txt
diff -u /tmp/phase1-drill/compose-config.before.txt \
  /tmp/phase1-drill/compose-config.after.txt \
  >/tmp/phase1-drill/compose-config.diff || true
```

## Results

- Backup archive: `/tmp/phase1-drill/infra-config-backup-2026-05-19.tgz`
- SHA256:
  - `f8fdc3e608d872bc09984e5705086e8a4c55cf75957b03142a956f5456f9983b`
- Restore extraction: successful
- Rollback simulation: successful
- Compose validation: successful before and after restore simulation
- Diff note: differences were expected path-root differences (`/home/runner/...` vs `/tmp/...`) with no service definition regressions.

## Acceptance

- Backup/restore workflow: **validated for infra config artifacts**
- Rollback workflow: **validated for infra config artifacts**
- Gate 2 evidence status: **satisfied with dated record**
